import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { RankingQuiz } from '../entities/RankingQuiz';
import { FavoriteProduct } from '../entities/FavoriteProduct';
import { ProductRescue } from '../entities/ProductRescue';
import { Product } from '../entities/Product';
import { Racing } from '../entities/Racing';
import { RacingBet } from '../entities/RacingBet';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    RankingQuiz,
    FavoriteProduct,
    ProductRescue,
    Product,
    Racing,
    RacingBet,
  ],
  ssl: { rejectUnauthorized: false },
});
