import express from 'express';
import userRoutes from './userRoutes';
import productRescueRoutes from './productRescueRoutes';
import productRoutes from './productRoutes';

const router = (app: express.Application) => {
  app.route('/').get((_req, res) => {
    res.send('API Limbo is running!');
  });
  
  app.use([userRoutes, productRescueRoutes, productRoutes]);
};

export default router;
