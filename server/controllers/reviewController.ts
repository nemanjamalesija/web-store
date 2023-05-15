import { Review } from '../models/reviewModel.ts';

import controllerFactory from './controllerFactory.ts';

const getAllReviews = controllerFactory.getAll(Review);
const createReview = controllerFactory.createOne(Review);

export default {
  getAllReviews,
  createReview,
};
