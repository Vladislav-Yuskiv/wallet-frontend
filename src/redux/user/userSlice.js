import { createSlice } from '@reduxjs/toolkit';
import userOperations from './userOperations';

const initialState = {
  user: { name: '', email: '', balance: 0 },
  token: null,
  isLoggedIn: false,
  serverError: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: {
    [userOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [userOperations.fetchCurrentBalance.fulfilled](state, { payload }) {
      state.user.balance = payload;
      state.isLoading = false;
    },
    [userOperations.register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [userOperations.login.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [userOperations.logout.fulfilled](state) {
      state.user = { name: '', email: '', balance: 0 };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [userOperations.fetchCurrentUser.rejected](state, { payload }) {
      if (payload) {
        state.user = { name: '', email: '', balance: 0 };
        state.token = null;
        state.isLoggedIn = false;
        state.serverError = payload;
      };
      state.isLoading = false;
    },
    [userOperations.fetchCurrentBalance.rejected](state, { payload }) {
      state.serverError = payload;
      state.isLoading = false;
    },
    [userOperations.register.rejected](state, { payload }) {
      state.serverError = payload;
      state.isLoading = false;
    },
    [userOperations.login.rejected](state, { payload }) {
      state.serverError = payload;
      state.isLoading = false;
    },
    [userOperations.logout.rejected](state, { payload }) {
      state.serverError = payload;
      state.isLoading = false;
    },
    [userOperations.fetchCurrentUser.pending](state) {
      state.serverError = null;
      state.isLoading = true;
    },
    [userOperations.fetchCurrentBalance.pending](state) {
      state.serverError = null;
      state.isLoading = true;
    },
    [userOperations.register.pending](state) {
      state.serverError = null;
      state.isLoading = true;
    },
    [userOperations.login.pending](state) {
      state.serverError = null;
      state.isLoading = true;
    },
    [userOperations.logout.pending](state) {
      state.serverError = null;
      state.isLoading = true;
    }
  }
});

export default userSlice.reducer;
