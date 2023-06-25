import { NextFunction, Request, Response } from 'express';
import { Review } from '../models/reviewModel.ts';
import controllerFactory from './controllerFactory.ts';

const setProductUserIds = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.body.currentUser.id;

  next();
};

const getAllReviews = controllerFactory.getAll(Review);
const getOneReview = controllerFactory.getOne(Review, '');
const createReview = controllerFactory.createOne(Review);
const updateReview = controllerFactory.updateOne(Review);
const deleteReview = controllerFactory.deleteOne(Review);

export default {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
  setProductUserIds,
};
