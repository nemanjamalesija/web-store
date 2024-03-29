import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import productsRouter from './routes/productsRouter';
import usersRouter from './routes/userRoutes';
import reviewsRouter from './routes/reviewsRouter';
import globalErrorHandler from './controllers/globalErrorController';
import AppError from './helpers/appError';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// MIDDLEWARE
app.use(morgan('dev'));

app.use(
  cors({
    origin: 'https://web-store-nemanjamalesija.vercel.app',
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   const allowedOrigins = ['https://web-store-nemanjamalesija.vercel.app'];
//   const { origin } = req.headers;

//   if (allowedOrigins.includes(origin as string)) {
//     res.setHeader('Access-Control-Allow-Origin', origin as string);
//   }

//   next();
// });

app.use(cors());
app.use(express.json());

app.use(
  '/public/images',
  express.static(path.join(__dirName, 'public/images'))
);

// ROUTES
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const message = `Can't find ${req.originalUrl} on this server`;
  const error = new AppError(message, 404);

  next(error);
});

app.use(globalErrorHandler);

export default app;
