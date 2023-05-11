import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import productsRouter from './routes/productsRouter.ts';
import usersRouter from './routes/userRoutes.ts';
import globalErrorHandler from './controllers/globalErrorController.ts';
import AppError from './helpers/appError.ts';

const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(
  '/public/images',
  express.static(path.join(__dirName, 'public/images'))
);

// ROUTES
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const message = `Can't find ${req.originalUrl} on this server`;
  const error = new AppError(message, 404);

  next(error);
});

app.use(globalErrorHandler);

export default app;
