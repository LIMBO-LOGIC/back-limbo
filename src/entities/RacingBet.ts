import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Racing } from './Racing';
import { User } from './User';

@Entity('racing_bet')
export class RacingBet {
  @PrimaryGeneratedColumn()
  id_racing_bet!: number;

  @ManyToOne(() => Racing, (racing) => racing.bets)
  racing!: Racing;

  @ManyToOne(() => User, (user) => user.racingBets)
  user!: User;
}
