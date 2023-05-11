import express from 'express';
import authController from '../controllers/authController.ts';

const router = express.Router();

router.route('/signup').post(authController.signUp);

export default router;
