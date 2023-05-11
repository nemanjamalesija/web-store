import { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel.ts';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 'sucess',
      length: products.length,
      data: { products },
    });
  } catch (error) {
    console.log(error);
  }
};

export default { getAllProducts };
