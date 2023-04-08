import { error } from '@pnotify/core';

const ERROR_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
};

const config = {
  animation: 'fade',
  delay: 4000
};

function errorNotification(errorMessage) {
  return error({
    ...config,
    title: 'Error',
    text: errorMessage
  });
}

export default function authErrorHandler(error, rejectWithValue) {
  const errorStatus = error.response.status;

  let errorMessage = '';

  if (errorStatus === ERROR_STATUS.SERVER_ERROR) {
    errorMessage = 'Oops, something goes wrong. Try again later';
    errorNotification(errorMessage);
  }

  if (errorStatus === ERROR_STATUS.CONFLICT) {
    errorMessage = 'This email is already in use, please enter another email';
    errorNotification(errorMessage);
  }

  if (errorStatus === ERROR_STATUS.NOT_FOUND) {
    errorMessage = 'Nothing was found on your request';
    errorNotification(errorMessage);
  }

  if (errorStatus === ERROR_STATUS.UNAUTHORIZED) {
    errorMessage =
      'Email or password or saved authorization data is wrong, please check your inputs values and try again or login again';
    errorNotification(errorMessage);
  }

  if (errorStatus === ERROR_STATUS.BAD_REQUEST) {
    errorMessage =
      'Your input values are incorrect, please check them and try again';
    errorNotification(errorMessage);
  }

  return rejectWithValue(error.message);
}
