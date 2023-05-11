import Product from '../models/productModel.ts';
import controllerFactory from './controllerFactory.ts';

const getAllProducts = controllerFactory.getAll(Product);
const createProduct = controllerFactory.createOne(Product);
const updateProduct = controllerFactory.updateOne(Product);
const deleteProduct = controllerFactory.deleteOne(Product);

export default { getAllProducts, createProduct, updateProduct, deleteProduct };
