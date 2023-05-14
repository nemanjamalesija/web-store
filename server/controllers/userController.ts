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
    // 1. Create error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
      const error = new AppError(
        'This route is not for password update. Please use /updateMypassword',
        400
      );

      next(error);
    }

    // 2. Filter fields that are not allowed
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

const getAllUsers = controllerFactory.getAll(User);
const getOneUser = controllerFactory.getOne(User, '');

// ONLY FOR ADMINISTORS. DO NOT UPDATE PASSWORDS WITH THIS
const updateUser = controllerFactory.updateOne(User);
const deleteUser = controllerFactory.deleteOne(User);

export default {
  getAllUsers,
  updateUser,
  deleteUser,
  getOneUser,
  getMe,
  updateMe,
};
