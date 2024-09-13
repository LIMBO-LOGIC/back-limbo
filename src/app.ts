import 'reflect-metadata';
import express, { Application } from 'express';
import { AppDataSource } from './config/database';

const app: Application = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Initialize the database
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => console.log(error));

export default app;
