import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../constants/baseURL';
import { userCredentials } from '../types/userCredentials';
import axios from 'axios';

const getUserFromLocalStorage = createAsyncThunk<userCredentials | null>(
  baseURL,
  async (_, { rejectWithValue }) => {
    try {
      const storedToken = localStorage.getItem('token');

      console.log('I run');

      if (!storedToken) {
        return null;
      }

      const response = await axios(`${baseURL}/users/getUserWithToken`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const {
        data: { data },
      } = response;

      const { _id, email, name, role } = data.user;

      return { _id, email, name, role, token: storedToken };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export default getUserFromLocalStorage;
