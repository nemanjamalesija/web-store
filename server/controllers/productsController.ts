import { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel.ts';
import controllerFactory from './controllerFactory.ts';

const getAllProducts = controllerFactory.getAll(Product);

export default { getAllProducts };
