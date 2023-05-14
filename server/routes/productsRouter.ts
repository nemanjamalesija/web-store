import express from 'express';
import productsController from '../controllers/productsController.ts';
import reviewsRouter from './reviewsRouter.ts';

const router = express.Router();

router.use('/:tourId/review', reviewsRouter);

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route('/:id')
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;
