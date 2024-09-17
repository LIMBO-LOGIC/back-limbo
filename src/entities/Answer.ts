import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './Question';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Question, (question) => question.id)
  question!: Question;

  @Column({ type: 'text' })
  answer!: string;

  @Column({ type: 'boolean', default: false })
  correct!: boolean;
}
