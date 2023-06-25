import express from 'express';
import productsController from '../controllers/productsController.ts';
import reviewsRouter from './reviewsRouter.ts';
import authController from '../controllers/authController.ts';

const router = express.Router();

router.use('/:productId/reviews', reviewsRouter);

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route('/:id')
  .get(productsController.getOneProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
