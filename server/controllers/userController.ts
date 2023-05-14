import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.ts';
import controllerFactory from './controllerFactory.ts';
import catchAsync from '../helpers/catchAsync.ts';
import AppError from '../helpers/appError.ts';

// ONLY FOR ADMINISTORS. DO NOT UPDATE PASSWORDS WITH THIS
const getAllUsers = controllerFactory.getAll(User);
const updateUser = controllerFactory.updateOne(User);
const deleteUser = controllerFactory.deleteOne(User);

export default { getAllUsers, updateUser, deleteUser };
