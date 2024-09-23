import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RankingQuiz } from './RankingQuiz';
import { FavoriteProduct } from './FavoriteProduct';
import { ProductRescue } from './ProductRescue';
import { RacingBet } from './RacingBet';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  fullname!: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  nickname!: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date!: Date;

  @Column('date')
  birthdate!: Date;

  @Column('boolean')
  active!: boolean;

  @Column('bigint')
  all_points!: number;

  @Column('bigint')
  current_points!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  profile_picture!: string;

  @OneToMany(() => RankingQuiz, (rankingQuiz) => rankingQuiz.user)
  rankings!: RankingQuiz[]; // Relacionamento inverso

  @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user)
  favoriteProducts!: FavoriteProduct[]; // Relacionamento inverso, opcional para carregar os favoritos

  @OneToMany(() => ProductRescue, (productRescue) => productRescue.user)
  productRescue!: ProductRescue[];

  @OneToMany(() => RacingBet, (racingBet) => racingBet.user)
  racingBets!: RacingBet[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
