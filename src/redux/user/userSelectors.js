const getUserName = (state) => state.session.user.name;

const getUserEmail = (state) => state.session.user.email;

const getUserBalance = (state) => state.session.user.balance;

const getUserServerError = (state) => state.session.serverError;

const getLoginStatus = (state) => state.session.isLoggedIn;

const getUserIsLoading = (state) => state.session.isLoading;

const userSelectors = {
  getUserName,
  getUserEmail,
  getUserBalance,
  getUserServerError,
  getLoginStatus,
  getUserIsLoading
};

export default userSelectors;
