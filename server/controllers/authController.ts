import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../helpers/catchAsync.ts';
import User from '../models/userModel.ts';
import AppError from '../helpers/appError.ts';
import { userType } from '../types/userType.ts';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING as string, {
    expiresIn: '90d',
  });
};

const createSendToken = (res: Response, statusCode: number, user: userType) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        ...user.toObject(),
        password: undefined,
      },
    },
  });
};

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm, role } = req.body;

    // 1. Create new user
    const newUser = await User.create({
      name,
      email,
      role,
      password,
      passwordConfirm,
    });

    // 2. Sign token an send success response
    createSendToken(res, 201, newUser);
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, photo } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      const error = new AppError('Please provide both email and password', 404);

      return next(error);
    }

    // 2. Check if the user exists && password is correct
    const currentUser = await User.findOne({ email }).select('+password');

    if (
      !currentUser ||
      !(await currentUser.correctPassword(password, currentUser.password))
    ) {
      const error = new AppError('Incorrect email or password', 401);

      next(error);
    } else {
      // 3. If everything ok, send token to client
      createSendToken(res, 200, currentUser);
    }
  }
);

const getUserWithToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the token and check if it exist
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer '))
      token = req.headers.authorization.split(' ')[1];

    // 2. Validate the token
    const decodeTokenFn: (token: string, secret: string) => Promise<any> =
      promisify(jwt.verify);

    const decodedTokenObj = await decodeTokenFn(
      token as string,
      process.env.JWT_SECRET_STRING as string
    );

    //  Check if user still exists
    const currentUser = await User.findById(decodedTokenObj.id);

    if (!currentUser) {
      return next();
    }

    //  Check if user changed password after the token was issued
    else if (currentUser.changedPasswordAfter(decodedTokenObj.iat)) {
      const error = new AppError(
        'User recently changed password! Please log in again',
        401
      );

      return next(error);

      // if all ok return user (for get all), put user in the body (for nested routes)
    } else {
      req.body = { ...req.body, currentUser };

      res.status(200).json({
        status: 'success',
        data: {
          currentUser,
        },
      });

      return next();
    }
  }
);

const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

export default {
  signUp,
  login,
  getUserWithToken,
  logout,
};
