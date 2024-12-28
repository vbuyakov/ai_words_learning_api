import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { AddWordsDto } from './dto/add-words.dto';
import { ArchiveListDto } from './dto/archive-list.dto';
import { Word } from '../words/entities/word.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listRepository.find({
      relations: ['words'],
      where: { isArchived: false },
    });
  }

  async create(createListDto: CreateListDto): Promise<List> {
    const list = this.listRepository.create(createListDto);
    return this.listRepository.save(list);
  }

  async addWords(listId: number, addWordsDto: AddWordsDto): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id: listId },
      relations: ['words'],
    });

    if (!list) {
      throw new NotFoundException(`List with ID ${listId} not found`);
    }

    const words = await this.wordRepository.findByIds(addWordsDto.wordIds);

    if (!words.length) {
      throw new NotFoundException('No valid words found to add');
    }

    list.words = [...list.words, ...words];
    return this.listRepository.save(list);
  }

  async archiveList(id: number, archiveListDto: ArchiveListDto): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id } });

    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    list.isArchived = archiveListDto.isArchived;
    return this.listRepository.save(list);
  }
}
