import { createSlice } from '@reduxjs/toolkit';
import teamOperations from './teamOperations';

const initialState = {
  all: [],
  isLoading: false,
  serverError: {
    status: null,
    message: null,
  },
};

const developersSlice = createSlice({
  name: 'developers',
  initialState,
  extraReducers: {
    [teamOperations.getDevelopers.fulfilled](state, { payload }) {
      state.all = [...payload];
      state.isLoading = false;
    },
    [teamOperations.getDevelopers.rejected](state, { payload }) {
      state.serverError = {
        status: payload.status,
        message: payload.message,
      };
    },

    [teamOperations.getDevelopers.pending](state, { payload }) {
      state.isLoading = true;
      state.serverError = {
        status: null,
        message: null,
      };
    },
  },
});

export default developersSlice.reducer;
