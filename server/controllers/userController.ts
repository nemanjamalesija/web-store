import User from '../models/userModel.ts';
import controllerFactory from './controllerFactory.ts';

const getAllUsers = controllerFactory.getAll(User);

export default { getAllUsers };
