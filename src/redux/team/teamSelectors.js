const getDevelopers = (state) => state.developers.all;
const getIsLoading = (state) => state.categories.isLoading;
const getErrorStatus = (state) => state.categories.serverError.status;
const getErrorMessage = (state) => state.categories.serverError.message;

const teamSelectors = {
  getDevelopers,
  getIsLoading,
  getErrorStatus,
  getErrorMessage,
};

export default teamSelectors;
