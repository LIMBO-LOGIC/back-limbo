import 'reflect-metadata';
import cors from 'cors';
import express, { Application } from 'express';
import { AppDataSource } from './config/database';
import router from './routes';

const app: Application = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

router(app);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => console.log(error));

export default app;
