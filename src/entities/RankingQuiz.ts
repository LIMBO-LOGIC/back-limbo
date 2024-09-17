import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('ranking')
export class RankingQuiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.rankings) // Relacionamento inverso
  user!: User;
}
