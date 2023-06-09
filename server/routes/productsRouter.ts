import express from 'express';
import productsController from '../controllers/productsController';
import reviewsRouter from './reviewsRouter';
import authController from '../controllers/authController';

const router = express.Router();

router.use('/:productId/reviews', reviewsRouter);

router
  .route('/')
  .get(authController.protect, productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route('/:id')
  .get(productsController.getOneProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
