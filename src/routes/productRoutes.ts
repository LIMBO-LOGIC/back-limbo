import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

router.post('/products', productController.create.bind(productController));
router.get('/products', productController.getAll.bind(productController));
router.get('/products/:id', productController.getById.bind(productController));
router.put('/products/:id', productController.update.bind(productController));
router.delete(
  '/products/:id',
  productController.delete.bind(productController)
);

export default router;
