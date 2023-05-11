import { NextFunction, Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import catchAsync from '../helpers/catchAsync.ts';

const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'sucess',
      length: doc.length,
      data: { doc },
    });
  });

const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = new Model(req.body);

    await doc.save();

    res.status(201).json({
      status: 'sucess',
      data: { doc },
    });
  });

export default { getAll, createOne };
