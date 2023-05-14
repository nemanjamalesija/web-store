import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.ts';
import controllerFactory from './controllerFactory.ts';
import catchAsync from '../helpers/catchAsync.ts';
import AppError from '../helpers/appError.ts';

const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.body.currentUser.id;

  next();
};

const getAllUsers = controllerFactory.getAll(User);
const getOneUser = controllerFactory.getOne(User, '');

// ONLY FOR ADMINISTORS. DO NOT UPDATE PASSWORDS WITH THIS
const updateUser = controllerFactory.updateOne(User);
const deleteUser = controllerFactory.deleteOne(User);

export default { getAllUsers, updateUser, deleteUser, getOneUser, getMe };
