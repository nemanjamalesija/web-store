import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../helpers/catchAsync';
import User from '../models/userModel';
import AppError from '../helpers/appError';
import { userType } from '../types/userType';

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

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get the token and check if it exists
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Validate the token
  const decodeTokenFn: (token: string, secret: string) => Promise<any> =
    promisify(jwt.verify);

  let decodedTokenObj;

  try {
    decodedTokenObj = await decodeTokenFn(
      token as string,
      process.env.JWT_SECRET_STRING as string
    );
  } catch (error) {
    return next(
      new AppError("The user belonging to the jwt token doesn't exist!", 400)
    );
  }

  // 3. Check if user still exists
  const currentUser = await User.findById(decodedTokenObj.id);

  if (!currentUser) {
    const message = 'The user belonging to the token no longer exists';
    const error = new AppError(message, 400);

    return next(error);
  }

  return currentUser;
};

const getUserWithToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = await authenticateUser(req, res, next);

    if (currentUser) {
      res.status(200).json({
        status: 'success',
        data: {
          user: currentUser,
        },
      });
    } else {
      return next();
    }
  }
);

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = await authenticateUser(req, res, next);

    if (currentUser) {
      req.body = { ...req.body, currentUser };
      return next();
    }
  }
);

const restrictTo = (role: 'admin') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userWithPrivilege = role.includes(req.body.currentUser.role);

    if (!userWithPrivilege) {
      const message = 'You do not have permission to perfom this operation';
      const error = new AppError(message, 403);

      return next(error);
    }
    return next();
  };
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

export default {
  signUp,
  login,
  getUserWithToken,
  logout,
  protect,
  restrictTo,
};
