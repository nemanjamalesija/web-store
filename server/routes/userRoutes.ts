import express from 'express';
import authController from '../controllers/authController.ts';
import userController from '../controllers/userController.ts';

const router = express.Router();

// AUTH
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/getUserWithToken', authController.getUserWithToken);

// USER SPECIFIC
router.route('/').get(userController.getAllUsers);

export default router;
