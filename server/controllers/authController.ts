import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../helpers/catchAsync.ts';
import User from '../models/userModel.ts';
import AppError from '../helpers/appError.ts';
import crypto from 'crypto';
import { userType } from '../types/userType.ts';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (res: Response, statusCode: number, user: userType) => {
  const token = signToken(user._id);

  const jwtCookieExpiresIn =
    Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000; // miliseconds

  const expirationDate = new Date(Date.now() + jwtCookieExpiresIn);

  const cookieOptions = {
    expires: expirationDate,
    secure: true,
    httpOnly: true,
  };

  if (process.env.NODE_ENV !== 'development') cookieOptions.secure === true;
  res.cookie('jwt', token, cookieOptions);

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
    const { email, password } = req.body;

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
    }

    // 3. If everything ok, send token to client
    else createSendToken(res, 200, currentUser);
  }
);

export default { signUp, login };
