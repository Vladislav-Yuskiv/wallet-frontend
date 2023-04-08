import * as yup from 'yup';
import emailRegExp from './emailRegExp';
import passwordRegExp from './passwordRegExp';

const registerFormValidationSchema = yup.object().shape({
  name: yup
    .string('Enter your name')
    .min(1, 'Name should contains minimum 1 and maximum 12 characters')
    .max(12, 'Name should contains minimum 1 and maximum 12 characters')
    .required('Name is required'),
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
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm your password')
    .test('passwords-match', 'Passwords should match', function (value) {
      return this.parent.password === value;
    })
    .required('Password confirmation is required')
});

export default registerFormValidationSchema;
