import { createSlice } from '@reduxjs/toolkit';
import transactionsOperations from './transactionsOperations';

const initialState = {
  all: [],
  byMonth: [],
  isLoading: false,
  serverError: {
    status: null,
    message: null,
  },
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: {
    [transactionsOperations.getTransactions.fulfilled](state, { payload }) {
      state.all = [...payload];
      state.isLoading = false;
    },
    [transactionsOperations.createTransaction.fulfilled](state, { payload }) {
      state.all = [...state.all, payload];
      state.isLoading = false;
    },
    [transactionsOperations.editTransaction.fulfilled](state, { payload }) {
      state.all = state.map((item) =>
        item.id !== payload.id ? item : payload
      );
      state.isLoading = false;
    },
    [transactionsOperations.deleteTransaction.fulfilled](state, { payload }) {
      state.all = [
        ...state.all.filter((transaction) => transaction.id !== payload.id),
      ];
      state.isLoading = false;
    },

    [transactionsOperations.getTransactions.rejected](state, { payload }) {
      state.serverError = {
        status: payload.status,
        message: payload.message,
      };
      state.isLoading = false;
    },
    [transactionsOperations.createTransaction.rejected](state, { payload }) {
      state.isLoading = false;
      state.serverError = {
        status: payload.status,
        message: payload.message,
      };
      state.isLoading = false;
    },
    [transactionsOperations.editTransaction.rejected](state, { payload }) {
      state.isLoading = false;
      state.serverError = {
        status: payload.status,
        message: payload.message,
      };
      state.isLoading = false;
    },
    [transactionsOperations.deleteTransaction.rejected](state, { payload }) {
      state.isLoading = false;
      state.serverError = {
        status: payload.status,
        message: payload.message,
      };
      state.isLoading = false;
    },

    [transactionsOperations.getTransactions.pending](state, { payload }) {
      state.isLoading = true;
      state.serverError = {
        status: null,
        message: null,
      };
    },
    [transactionsOperations.createTransaction.pending](state, { payload }) {
      state.isLoading = true;
      state.serverError = {
        status: null,
        message: null,
      };
    },
    [transactionsOperations.editTransaction.pending](state, { payload }) {
      state.isLoading = true;
      state.serverError = {
        status: null,
        message: null,
      };
    },
    [transactionsOperations.deleteTransaction.pending](state, { payload }) {
      state.isLoading = true;
      state.serverError = {
        status: null,
        message: null,
      };
    },
  },
});

export default transactionSlice.reducer;
