import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import productsRouter from './routes/productsRouter.ts';

const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirName, 'dev-data/images')));

// ROUTES
app.use('/api/v1/products', productsRouter);

export default app;
