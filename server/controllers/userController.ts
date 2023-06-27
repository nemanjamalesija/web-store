import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.ts';
import controllerFactory from './controllerFactory.ts';
import catchAsync from '../helpers/catchAsync.ts';
import AppError from '../helpers/appError.ts';
import filterObj from '../helpers/filterObj.ts';

const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.body.currentUser.id;

  next();
};

const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //1. Check if no input
    if (!req.body.name && !req.body.email)
      return next(new AppError('Please provide name or email to update', 400));

    // 2. Filter out fields that are not allowed
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3. Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.body.currentUser.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    //4. Send response to the client
    res.status(200).json({
      status: 'sucess',
      data: {
        updatedUser,
      },
    });
  }
);

const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.body.currentUser._id, {
      active: false,
    });

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  }
);

const getAllUsers = controllerFactory.getAll(User);

// ONLY FOR ADMINISTORS
const updateUser = controllerFactory.updateOne(User);
const deleteUser = controllerFactory.deleteOne(User);

export default {
  getAllUsers,
  deleteUser,
  updateUser,
  getMe,
  updateMe,
  deleteMe,
};
