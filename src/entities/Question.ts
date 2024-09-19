import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Answer } from './Answer';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  question!: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[]; // Relacionamento inverso, opcional para carregar as respostas

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
