import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { UserStatus } from '../enums/user-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.NON_CONFIRMED })
  status: UserStatus;

  @Column({ nullable: true })
  confirmationCode: string; // Code sent to the user's email for confirmation

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  confirmedAt?: Date;

  @Column({ nullable: true })
  blockedAt?: Date;

  @Column({ nullable: true })
  blockingNote?: string;
}
