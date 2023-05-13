import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import getUserFromLocalStorage from '../helpers/getUserLocalStorage';
import { userCredentials } from '../types/userCredentials';
import { authState } from '../initialStates/authState';

const authSlice = createSlice({
  name: 'authState',
  initialState: authState,
  reducers: {
    logInUser: (state, action: PayloadAction<userCredentials>) => {
      state.user = action.payload;
    },
  },

  extraReducers: (bulider) => {
    bulider.addCase(getUserFromLocalStorage.pending, (state, _) => {
      state.loading = true;
    });

    bulider.addCase(getUserFromLocalStorage.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      else state.user = action.payload;
    });
    bulider.addCase(getUserFromLocalStorage.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const authReducer = authSlice.reducer;

export const { logInUser } = authSlice.actions;
