import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { Translation, Word, Example } from './entities/word.entity'; // Import the Word entity
import { List } from '../lists/entities/list.entity'; // Import the List entity
import { AppConfigModule } from '../config/app-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word, List, Translation, Example]), // Register Word and List entities
    AppConfigModule, // Import AppConfigModule for AppConfigService
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
