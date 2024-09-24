import { Router } from 'express';
import { FavoriteProductController } from '../controllers/FavoriteProductController';

const router = Router();
const favoriteProductController = new FavoriteProductController();

router.post(
  '/favoriteProduct',
  favoriteProductController.createFavoriteProduct.bind(
    favoriteProductController
  )
);

router.get(
  '/favoriteProduct/:userId',
  favoriteProductController.getFavoriteProductsByUser.bind(
    favoriteProductController
  )
);

router.delete(
  '/favoriteProduct/:id',
  favoriteProductController.deleteFavoriteProduct.bind(
    favoriteProductController
  )
);

export default router;
