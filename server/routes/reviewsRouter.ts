import express from 'express';
import reviewController from '../controllers/reviewController.ts';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

export default router;
