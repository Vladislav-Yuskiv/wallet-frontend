import * as yup from 'yup';
import emailRegExp from './emailRegExp';
import passwordRegExp from './passwordRegExp';

const loginFormValidationSchema = yup.object().shape({
  email: yup
    .string('Enter your email')
    .matches(emailRegExp, 'Enter valid email such as emample@mail.com')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .matches(
      passwordRegExp,
      'From 6 to 12 chars, Uppercase and lowercase, numbers, @,$,!,%,*,?,&'
    )
    .required('Password is required')
});

export default loginFormValidationSchema;
