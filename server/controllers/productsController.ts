import Product from '../models/productModel.ts';
import controllerFactory from './controllerFactory.ts';

const getAllProducts = controllerFactory.getAll(Product);
const createProduct = controllerFactory.createOne(Product);
const updateProduct = controllerFactory.updateOne(Product);

export default { getAllProducts, createProduct, updateProduct };
