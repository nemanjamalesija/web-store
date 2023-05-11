import express from 'express';
import productsController from '../controllers/productsController.ts';

const router = express.Router();

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route('/:id')
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
