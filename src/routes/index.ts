import express from 'express';
import userRouter from './userRoutes';
import productRescue from './productRescueRoutes';

const router = (app: express.Application) => {
  app.route('/').get((req, res) => {
    res.send('API Limbo is running!');
  });

  app.use(userRouter);
  app.use(productRescue);
};

export default router;
