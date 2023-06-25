import express from 'express';
import reviewController from '../controllers/reviewController.ts';
import authController from '../controllers/authController.ts';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.getUserWithToken,
    reviewController.setProductUserIds,
    reviewController.createReview
  );

router.use(authController.getUserWithToken);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default router;
