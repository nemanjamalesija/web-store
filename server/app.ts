import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productsRouter from './routes/productsRouter.ts';

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/v1/products', productsRouter);

export default app;
