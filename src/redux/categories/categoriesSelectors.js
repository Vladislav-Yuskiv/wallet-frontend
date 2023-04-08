const getCategories = (state) => state.categories.all;
const getIsLoading = (state) => state.categories.isLoading;
const getErrorStatus = (state) => state.categories.serverError.status;
const getErrorMessage = (state) => state.categories.serverError.message;

const categoriesSelectors = {
  getCategories,
  getIsLoading,
  getErrorStatus,
  getErrorMessage,
};

export default categoriesSelectors;
