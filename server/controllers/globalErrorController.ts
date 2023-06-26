import { NextFunction, Request, Response } from 'express';
import AppError from '../helpers/appError.ts';
import { castErrorDB } from '../types/castError.ts';
import { duplicateErrorDB } from '../types/duplicateError.ts';
import { validatorErrorDB } from '../types/validatorError.ts';

const sendError = (res: Response, err: any) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(err.statusCode || 500).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
};

const handleCastErrorDB = (err: castErrorDB) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 404);
};

const handleDuplicateFieldErrorDB = (err: duplicateErrorDB) => {
  const productName = err.keyValue.email;
  const userEmail = err.keyValue.email;
  let message: string = '';

  if (productName)
    message = `The product under the name ${productName} already exists`;

  if (userEmail)
    message = `The user under the email ${userEmail} already exists`;

  return new AppError(message, 404);
};

const handleValidatorErrorDB = (err: validatorErrorDB) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 404);
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };

  // MONGO DB ERRORS
  // 1. Cast error
  if (err.name === 'CastError') error = handleCastErrorDB(error as castErrorDB);

  // 2. Tour name already exist
  if (err.code === 11000)
    error = handleDuplicateFieldErrorDB(error as duplicateErrorDB);

  // 3. Didn't specify all fields
  if (err.name === 'ValidationError')
    error = handleValidatorErrorDB(error as validatorErrorDB);

  sendError(res, error);
};

export default globalErrorHandler;
