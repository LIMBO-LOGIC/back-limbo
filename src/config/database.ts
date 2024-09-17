import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { RankingQuiz } from '../entities/RankingQuiz';
import { FavoriteProduct } from '../entities/FavoriteProduct';
import { ProductRescue } from '../entities/ProductRescue';
import { Product } from '../entities/Product';
import { Question } from '../entities/Question';
import { Answer } from '../entities/Answer';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Descomente para sincronizar as tabelas
  logging: false,
  entities: [
    User,
    RankingQuiz,
    FavoriteProduct,
    ProductRescue,
    Product,
    Question,
    Answer,
  ],
});
