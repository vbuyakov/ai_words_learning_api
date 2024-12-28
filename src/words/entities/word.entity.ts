import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => Translation, (translation) => translation.word, {
    cascade: true,
  })
  translations: Translation[];

  @OneToMany(() => Example, (example) => example.word, { cascade: true })
  examples: Example[];

  @ManyToMany(() => List, (list) => list.words)
  @JoinTable()
  lists: List[];
}

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string; // "EN", "RU", etc.

  @Column()
  text: string;

  @Column({ nullable: true })
  type: string; // "noun", "verb", etc.

  @ManyToOne(() => Word, (word) => word.translations)
  word: Word;
}

@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string; // "FR", etc.

  @Column()
  sentence: string;

  @Column('json')
  translations: { EN: string; RU: string };

  @ManyToOne(() => Word, (word) => word.examples)
  word: Word;
}
