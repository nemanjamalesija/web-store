import { userCredentials } from './userCredentials';

export type authStateType = {
  user: userCredentials;
  loading: boolean;
  error: any;
};
