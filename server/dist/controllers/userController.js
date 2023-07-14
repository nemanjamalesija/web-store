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
import User from '../models/userModel.js';
import controllerFactory from './controllerFactory.js';
import catchAsync from '../helpers/catchAsync.js';
import AppError from '../helpers/appError.js';
import multer from 'multer';
const getMe = (req, res, next) => {
  req.params.id = req.body.currentUser.id;
  next();
};
const updateMe = catchAsync((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('aaa');
    console.log(req.body.file + ' this is req file');
    console.log(req.body + ' this is req body');
    //1. Check if no input
    if (!req.body.name && !req.body.email)
      return next(new AppError('Please provide name or email to update', 400));

    // 2. Update user document
    const updatedUser = yield User.findByIdAndUpdate(req.body.currentUser.id, {
      new: true,
      runValidators: true,
    });
    //3. Send response to the client
    res.status(200).json({
      status: 'sucess',
      data: {
        updatedUser,
      },
    });
  })
);
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
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
export const updateUserPhoto = catchAsync(function (req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!req.file)
      return next(new AppError('Please provide the photo to update!', 400));
    const photoRefernce = `${req.file.filename}`;
    const updatedUser = yield User.findByIdAndUpdate(
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
});
const deleteMe = catchAsync((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield User.findByIdAndUpdate(req.body.currentUser._id, {
      active: false,
    });
    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  })
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
