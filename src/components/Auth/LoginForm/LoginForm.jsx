import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import AuthFormWrapper from '../AuthFormWrapper';
import AuthForm from '../AuthForm';
import { EmailInputWithFormik, PasswordInputWithFormik } from '../../Inputs';

import { loginFormValidationSchema } from '../../../utils';
import { userOperations } from '../../../redux/user';

export default function LoginForm() {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginFormValidationSchema,
    onSubmit: (values) => {
      dispatch(userOperations.login(values));
      formik.handleReset();
    }
  });

  const isError =
    (formik.touched.password || Boolean(formik.values.password)) &&
    Boolean(formik.errors.password);

  const shouldErrorTextDisplayed =
    formik.touched.password || Boolean(formik.values.password);

  return (
    <AuthFormWrapper>
      <AuthForm
        formik={formik}
        primaryBtnText="login"
        secondaryBtnText="register"
        navigateTo="/register"
      >
        <EmailInputWithFormik formik={formik} autoFocus />
        <PasswordInputWithFormik
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={isError}
          helperText={shouldErrorTextDisplayed && formik.errors.password}
          placeholder="Password"
        />
      </AuthForm>
    </AuthFormWrapper>
  );
}
