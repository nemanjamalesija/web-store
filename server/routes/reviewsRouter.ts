import express from 'express';
import reviewController from '../controllers/reviewController.ts';
import authController from '../controllers/authController.ts';

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.setProductUserIds, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default router;
