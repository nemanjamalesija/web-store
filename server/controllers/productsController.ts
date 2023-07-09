import Product from '../models/productModel';
import controllerFactory from './controllerFactory';

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
