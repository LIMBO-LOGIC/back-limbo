import express from 'express';
import userRoutes from './userRoutes';
import productRescueRoutes from './productRescueRoutes';
import productRoutes from './productRoutes';
import racingRoutes from './racingRoutes';
import racingBetRoutes from './racingBetRoutes';
import favoriteProductRoutes from './favoriteProductsRoutes';

const router = (app: express.Application) => {
  app.route('/').get((_req, res) => {
    res.send('API Limbo is running!');
  });

  app.use([
    userRoutes,
    productRescueRoutes,
    productRoutes,
    racingRoutes,
    racingBetRoutes,
    favoriteProductRoutes,
  ]);
};

export default router;
