import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Racing } from './Racing';
import { User } from './User';

@Entity('racing_bet')
export class RacingBet {
  @PrimaryGeneratedColumn()
  id_racing_bet!: number;

  @Column({ type: 'text', default: ''})
  list_pilots!: string;

  @ManyToOne(() => Racing, (racing) => racing.bets)
  racing!: Racing;

  @ManyToOne(() => User, (user) => user.racingBets)
  user!: User;
}
