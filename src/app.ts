import 'reflect-metadata';
import express, { Application } from 'express';
import { AppDataSource } from './config/database';
import router from './routes';

const app: Application = express();
app.use(express.json());

router(app);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => console.log(error));

export default app;
