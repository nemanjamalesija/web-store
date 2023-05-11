import express from 'express';
import productsController from '../controllers/productsController.ts';

const router = express.Router();

router.route('/').get(productsController.getAllProducts);
router.route('/').post(productsController.createProduct);

export default router;
