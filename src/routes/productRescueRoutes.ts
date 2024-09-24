import { Router } from 'express';
import { ProductRescueController } from '../controllers/ProductRescueController';

const router = Router();
const productRescueController = new ProductRescueController();

// Rota para buscar produtos resgatados pelo ID do usuário
router.get(
  '/product-rescues/:userId',
  productRescueController.getRescuedProductsByUser.bind(productRescueController)
);

// POST: Criar um novo resgate de produto
router.post(
  '/product-rescues',
  productRescueController.createRescuedProduct.bind(productRescueController)
);

export default router;
