import { createSlice } from '@reduxjs/toolkit';
import categoriesOperations from './categotiesOperation';

const initialState = {
  all: [],
  isLoading: false,
  serverError: {
    status: null,
    message: null,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [categoriesOperations.getCategories.fulfilled](state, { payload }) {
      state.all = [...payload];
    },
    [categoriesOperations.getCategories.rejected](state, { payload }) {
      state.serverError = {
        status: payload.status,
        message: payload.message,
      };
    },

    [categoriesOperations.getCategories.pending](state, { payload }) {
      state.serverError = {
        status: null,
        message: null,
      };
    },
  },
});

export default categoriesSlice.reducer;
