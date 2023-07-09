var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import catchAsync from '../helpers/catchAsync.js';
import User from '../models/userModel.js';
import AppError from '../helpers/appError.js';
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: '90d',
  });
};
const createSendToken = (res, statusCode, user) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: Object.assign(Object.assign({}, user.toObject()), {
        password: undefined,
      }),
    },
  });
};
const signUp = catchAsync((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirm, role } = req.body;
    // 1. Create new user
    const newUser = yield User.create({
      name,
      email,
      role,
      password,
      passwordConfirm,
    });
    // 2. Sign token an send success response
    createSendToken(res, 201, newUser);
  })
);
const login = catchAsync((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, photo } = req.body;
    // 1. Check if email and password exist
    if (!email || !password) {
      const error = new AppError('Please provide both email and password', 404);
      return next(error);
    }
    // 2. Check if the user exists && password is correct
    const currentUser = yield User.findOne({ email }).select('+password');
    if (
      !currentUser ||
      !(yield currentUser.correctPassword(password, currentUser.password))
    ) {
      const error = new AppError('Incorrect email or password', 401);
      next(error);
    } else {
      // 3. If everything ok, send token to client
      createSendToken(res, 200, currentUser);
    }
  })
);
const authenticateUser = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 1. Get the token and check if it exists
    let token;
    if (
      (_a = req.headers.authorization) === null || _a === void 0
        ? void 0
        : _a.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Validate the token
    const decodeTokenFn = promisify(jwt.verify);
    let decodedTokenObj;
    try {
      decodedTokenObj = yield decodeTokenFn(
        token,
        process.env.JWT_SECRET_STRING
      );
    } catch (error) {
      return next(
        new AppError("The user belonging to the jwt token doesn't exist!", 400)
      );
    }
    // 3. Check if user still exists
    const currentUser = yield User.findById(decodedTokenObj.id);
    if (!currentUser) {
      const message = 'The user belonging to the token no longer exists';
      const error = new AppError(message, 400);
      return next(error);
    }
    return currentUser;
  });
const getUserWithToken = catchAsync((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield authenticateUser(req, res, next);
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
  })
);
const protect = catchAsync((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield authenticateUser(req, res, next);
    if (currentUser) {
      req.body = Object.assign(Object.assign({}, req.body), { currentUser });
      return next();
    }
  })
);
const restrictTo = (role) => {
  return (req, res, next) => {
    const userWithPrivilege = role.includes(req.body.currentUser.role);
    if (!userWithPrivilege) {
      const message = 'You do not have permission to perfom this operation';
      const error = new AppError(message, 403);
      return next(error);
    }
    return next();
  };
};
const logout = (req, res) => {
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
