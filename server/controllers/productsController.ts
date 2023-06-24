import AppError from '../helpers/appError.ts';
import Product from '../models/productModel.ts';
import controllerFactory from './controllerFactory.ts';
import { Request } from 'express';

// upload.single('image') req.file
// upload.array('images', 5) req.files

const getAllProducts = controllerFactory.getAll(Product);
const getOneProduct = controllerFactory.getOne(Product, 'reviews');
const createProduct = controllerFactory.createOne(Product);
const updateProduct = controllerFactory.updateOne(Product);
const deleteProduct = controllerFactory.deleteOne(Product);

export default {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
};
