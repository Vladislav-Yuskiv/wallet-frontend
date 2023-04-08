import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import AuthFormWrapper from '../AuthFormWrapper';
import AuthForm from '../AuthForm';
import {
  NameInputWithFormik,
  EmailInputWithFormik,
  PasswordInputWithFormik
} from '../../Inputs';
import ProgressBar from '../../ProgressBar';

import styles from './RegisterForm.module.css';

import { registerFormValidationSchema } from '../../../utils';
import { userOperations } from '../../../redux/user';

const INITIAL_FORM_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const INITIAL_IS_FIELD_FILLED_VALUES = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false
};

const PROGRESS_VALUES = {
  zero: 0,
  diff: 25,
  hundred: 100
};

export default function RegisterForm() {
  const [progress, setProgress] = useState(PROGRESS_VALUES.zero);
  const [isFieldFilled, setFieldFilled] = useState(
    INITIAL_IS_FIELD_FILLED_VALUES
  );

  const dispatch = useDispatch();

  //========== Formik logic=============

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: registerFormValidationSchema,
    onSubmit: (values) => {
      const { name, email, password } = values;
      dispatch(
        userOperations.register({
          name,
          email,
          password
        })
      );
      formik.handleReset();
      setProgress(0);
      setFieldFilled(INITIAL_IS_FIELD_FILLED_VALUES);
    }
  });

  //========== end of Formik logic ==========

  //========== progress bar logic ===========

  const handleFieldFilledStatus = (isFieldFilledKey) => {
    setFieldFilled((prevState) => ({
      ...prevState,
      [isFieldFilledKey]: !prevState[isFieldFilledKey]
    }));
  };

  const decreaseProgress = (isFieldFilledKey, inputName) => {
    if (!formik.values[inputName].trim()) {
      setProgress(progress - PROGRESS_VALUES.diff);
      handleFieldFilledStatus(isFieldFilledKey);
    }
  };

  const increaseProgress = (isFieldFilledKey, inputName) => {
    if (formik.values[inputName].trim()) {
      setProgress(progress + PROGRESS_VALUES.diff);
      handleFieldFilledStatus(isFieldFilledKey);
    }
  };

  const handleProgressChange = (
    isFieldFilledKey,
    isFieldFilledKeyValue,
    inputName
  ) => {
    if (isFieldFilledKey.includes(inputName)) {
      if (isFieldFilledKeyValue) {
        return decreaseProgress(isFieldFilledKey, inputName);
      }

      increaseProgress(isFieldFilledKey, inputName);
    }

    if (progress < PROGRESS_VALUES.zero) {
      setProgress(PROGRESS_VALUES.zero);
    }

    if (progress > PROGRESS_VALUES.hundred) {
      setProgress(PROGRESS_VALUES.hundred);
    }
  };

  const handleBlur = (event) => {
    const { name: inputName } = event.target;

    for (const key in isFieldFilled) {
      if (Object.hasOwnProperty.call(isFieldFilled, key)) {
        const keyValue = isFieldFilled[key];
        handleProgressChange(key, keyValue, inputName);
      }
    }
  };
  //================ end of progress bar logic ===============

  const isPasswordError =
    (formik.touched.password || Boolean(formik.values.password)) &&
    Boolean(formik.errors.password);

  const shouldPasswordErrorTextDisplayed =
    formik.touched.password || Boolean(formik.values.password);

  const isConfirmPasswordError =
    (formik.touched.confirmPassword ||
      Boolean(formik.values.confirmPassword)) &&
    Boolean(formik.errors.confirmPassword);

  const shouldConfirmPasswordErrorTextDisplayed =
    formik.touched.confirmPassword || Boolean(formik.values.confirmPassword);

  return (
    <AuthFormWrapper>
      <AuthForm
        formik={formik}
        primaryBtnText="register"
        secondaryBtnText="login"
        navigateTo="/login"
      >
        <NameInputWithFormik formik={formik} autoFocus onBlur={handleBlur} />
        <EmailInputWithFormik formik={formik} onBlur={handleBlur} />
        <PasswordInputWithFormik
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={handleBlur}
          value={formik.values.password}
          error={isPasswordError}
          helperText={
            shouldPasswordErrorTextDisplayed && formik.errors.password
          }
          placeholder="Password"
        />
        <PasswordInputWithFormik
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={handleBlur}
          value={formik.values.confirmPassword}
          error={isConfirmPasswordError}
          helperText={
            shouldConfirmPasswordErrorTextDisplayed &&
            formik.errors.confirmPassword
          }
          placeholder="Confirm your password"
        />
        <div className={styles.progressBarWrapper}>
          <ProgressBar progress={progress} />
        </div>
      </AuthForm>
    </AuthFormWrapper>
  );
}
