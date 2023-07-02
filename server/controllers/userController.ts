import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.ts';
import controllerFactory from './controllerFactory.ts';
import catchAsync from '../helpers/catchAsync.ts';
import AppError from '../helpers/appError.ts';
import filterObj from '../helpers/filterObj.ts';

import multer from 'multer';

const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.body.currentUser.id;

  next();
};

const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('aaa');
    console.log(req.body.file + ' this is req file');
    console.log(req.body + ' this is req body');

    //1. Check if no input
    if (!req.body.name && !req.body.email)
      return next(new AppError('Please provide name or email to update', 400));

    // 2. Filter out fields that are not allowed
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3. Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.body.currentUser.id,

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

const multerStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    console.log(file + 'this is multer here');

    cb(null, 'public/images/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const updateUserPhoto = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(
    req.file,
    JSON.stringify(req.body + 'this is the body in the route')
  );

  if (!req.file)
    return next(new AppError('Please provide the photo to update!', 400));

  const photoRefernce = `http://127.0.0.1:3001/public/images/users/${req.file.filename}`;

  const updatedUser = await User.findByIdAndUpdate(
    req.body.currentUser.id,
    { photo: photoRefernce },

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
});

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
  updateUserPhoto,
};
