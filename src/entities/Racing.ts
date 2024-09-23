import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RacingBet } from './RacingBet';

@Entity('racing')
export class Racing {
  @PrimaryGeneratedColumn()
  id_racing!: number;

  @Column({ type: 'timestamp', unique: true })
  race_date!: Date;

  @Column({ type: 'varchar', length: 255 })
  country_flag!: string;

  @Column({ type: 'varchar', length: 50 })
  circuit_location!: string;

  @Column({ type: 'varchar', length: 255 })
  circuit_image!: string;

  @Column({ type: 'char', length: 1 })
  status!: string; // A = Scheduled, C = Canceled, F = Finished

  @Column({ type: 'int' })
  round!: number;

  @OneToMany(() => RacingBet, (racingBet) => racingBet.racing)
  bets!: RacingBet[]; // Relationship with RacingBet
}
