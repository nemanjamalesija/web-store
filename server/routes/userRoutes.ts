import express from 'express';
import authController from '../controllers/authController.ts';
import userController, { upload } from '../controllers/userController.ts';

const router = express.Router();

// AUTH
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/getUserWithToken', authController.getUserWithToken);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);

router.patch(
  '/updatePhoto',
  upload.single('photo'),
  userController.updateUserPhoto
);

router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

// ADMINISTRATORS
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
