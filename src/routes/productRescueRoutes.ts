import { Router } from 'express';
import { ProductRescueController } from '../controllers/ProductRescueController';

const router = Router();
const productRescueController = new ProductRescueController();

// POST: Criar um novo resgate de produto
router.post(
  '/product-rescues',
  productRescueController.createRescuedProduct.bind(productRescueController)
);

// Rota para buscar produtos resgatados pelo ID do usuário
router.get(
  '/product-rescues/:userId',
  productRescueController.getRescuedProductsByUser.bind(productRescueController)
);

router.delete(
  '/product-rescues/:id',
  productRescueController.deleteRescuedProduct.bind(productRescueController)
);

export default router;
