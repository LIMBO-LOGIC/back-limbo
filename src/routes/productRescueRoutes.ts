import { Router } from 'express';
import { ProductRescueController } from '../controllers/productRescueController';

const router = Router();
const productRescueController = new ProductRescueController();

// Rota para buscar produtos resgatados pelo ID do usuário
router.get(
  '/product-rescues/:userId',
  productRescueController.getRescuedProductsByUser.bind(productRescueController)
);

export default router;
