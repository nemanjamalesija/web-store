import { authStateType } from '../types/authStateType';
import { userState } from './userState';

export const authState: authStateType = {
  user: userState,
  loading: false,
  error: '',
};
