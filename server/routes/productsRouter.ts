import express from 'express';
import productsController from '../controllers/productsController.ts';
import authController from '../controllers/authController.ts';

const router = express.Router();

router
  .route('/')
  .get(authController.protect, productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route('/:id')
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
