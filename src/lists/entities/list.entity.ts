import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Word } from '../../words/entities/word.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Word, { cascade: true })
  @JoinTable()
  words: Word[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
