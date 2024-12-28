import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './entities/list.entity';
import { Word } from '../words/entities/word.entity'; // Assuming you have a Word module or entity
import { WordsModule } from 'src/words/words.module';

@Module({
  imports: [TypeOrmModule.forFeature([List, Word]), WordsModule],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
