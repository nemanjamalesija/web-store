import { NextFunction, Request, Response } from 'express';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: 'sucess',
      message: 'Connection was ok',
    });
  } catch (error) {
    console.log(error);
  }
};

export default { getAllProducts };
