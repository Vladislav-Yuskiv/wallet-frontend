const getTransactions = (state) => state.transactions.all;
const getIsLoading = (state) => state.transactions.isLoading;
const getErrorStatus = (state) => state.transactions.serverError.status;
const getErrorMessage = (state) => state.transactions.serverError.message;

const transactionSelectors = {
  getTransactions,
  getIsLoading,
  getErrorStatus,
  getErrorMessage,
};

export default transactionSelectors;
