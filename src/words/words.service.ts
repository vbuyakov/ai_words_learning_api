import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word, Translation, Example } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { List } from '../lists/entities/list.entity';
import { AppConfigService } from '../config/app-config.service';
import { OpenAI } from 'openai';
import { getTranslationsAndExamplesPrompt } from './prompts.helper';

@Injectable()
export class WordsService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly appConfigService: AppConfigService,
  ) {
    const apiKey = this.appConfigService.get('CHATGPT_API_KEY');
    this.openai = new OpenAI({ apiKey });
  }

  private async getChatGPTData(word: string): Promise<any> {
    const model = this.appConfigService.get('CHATGPT_MODEL', 'gpt-4-turbo'); // Fetch model from AppConfigService
    const prompt = getTranslationsAndExamplesPrompt(word);

    const response = await this.openai.chat.completions.create({
      model, // Use model from config
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new NotFoundException(
        'Failed to fetch translation data from ChatGPT.',
      );
    }

    console.log(content);

    return JSON.parse(content);
  }

  public async create(createWordDto: CreateWordDto): Promise<Word[]> {
    const { words, listId } = createWordDto;
    const wordsToAdd: Word[] = [];

    // Fetch the list if listId is provided
    let list: List | null = null;
    if (listId) {
      list = await this.listRepository.findOne({ where: { id: listId } });
      if (!list) {
        throw new NotFoundException(`List with id ${listId} not found.`);
      }
    }

    for (const text of words) {
      // Check if the word exists in the database, ignoring accents
      const normalizedText = this.normalizeText(text);
      const existingWord = await this.wordRepository
        .createQueryBuilder('word')
        .where('unaccent(word.text) ILIKE unaccent(:text)', {
          text: normalizedText,
        })
        .leftJoinAndSelect('word.translations', 'translations')
        .leftJoinAndSelect('word.examples', 'examples')
        .leftJoinAndSelect('word.lists', 'lists')
        .getOne();

      if (existingWord) {
        wordsToAdd.push(existingWord);
        continue;
      }

      // Fetch data from ChatGPT API if the word doesn't exist
      const data = await this.getChatGPTData(text);

      // Create and save translations and examples
      const translations = data.translations.map((t) =>
        this.translationRepository.create({
          language: t.language,
          text: t.text,
          type: t.type,
        }),
      );

      const examples = data.examples.map((e) =>
        this.exampleRepository.create({
          language: e.language,
          sentence: e.sentence,
          translations: e.translations,
        }),
      );

      const word = this.wordRepository.create({
        text: data.correctedWord,
        translations,
        examples,
      });

      // Associate the word with the specified list or the default list
      word.lists = list ? [list] : [await this.getDefaultList()];
      await this.wordRepository.save(word);

      wordsToAdd.push(word);
    }

    return wordsToAdd;
  }

  private normalizeText(text: string): string {
    // Normalize text to remove accents
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  private async getDefaultList(): Promise<List> {
    let defaultList = await this.listRepository.findOne({
      where: { isDefault: true },
    });
    if (!defaultList) {
      defaultList = this.listRepository.create({
        name: 'Default',
        isDefault: true,
      });
      await this.listRepository.save(defaultList);
    }
    return defaultList;
  }
}
