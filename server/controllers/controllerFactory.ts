import { NextFunction, Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import catchAsync from '../helpers/catchAsync';
import AppError from '../helpers/appError';

const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // To allow for nested GET reviews on product
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    const doc = await Model.find(filter);

    // SEND RESPONSE
    res.status(200).json({
      status: 'sucess',
      length: doc.length,
      data: { doc },
    });
  });

const getOne = <T>(Model: Model<T>, populateField: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id).populate(populateField);

    if (!doc) {
      const error = new AppError('There is no document with that ID', 404);

      return next(error);
    }

    res.status(200).json({
      status: 'sucess',
      data: { doc },
    });
  });

const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: { doc },
    });
  });

const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      const error = new AppError('No document found with that ID', 404);

      return next(error);
    }

    res.status(201).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });

const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      const error = new AppError('No document found with that ID', 404);

      return next(error);
    }

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  });

export default { getAll, createOne, updateOne, deleteOne, getOne };
