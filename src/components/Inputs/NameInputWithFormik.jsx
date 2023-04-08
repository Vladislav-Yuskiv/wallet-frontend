import PropTypes from 'prop-types';

import { InputAdornment } from '@mui/material';
import { AccountBox as AccountBoxIcon } from '@mui/icons-material';

import CustomTextFiledStyled from './CustomTextFiledStyled';

export default function NameInputWithFormik({
  formik,
  autoFocus = false,
  onBlur
}) {
  const isInputError =
    (formik.touched.name || Boolean(formik.values.name)) &&
    Boolean(formik.errors.name);

  const shouldErrorTextDisplayed =
    formik.touched.name || Boolean(formik.values.name);

  return (
    <CustomTextFiledStyled
      fullWidth
      type="text"
      id="name"
      name="name"
      placeholder="Your name"
      variant="standard"
      onChange={formik.handleChange}
      onBlur={onBlur}
      value={formik.values.name}
      error={isInputError}
      helperText={(shouldErrorTextDisplayed && formik.errors.name) || ' '}
      autoFocus={autoFocus}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountBoxIcon />
          </InputAdornment>
        )
      }}
    />
  );
}

NameInputWithFormik.propTypes = {
  formik: PropTypes.shape({}).isRequired,
  autoFocus: PropTypes.bool,
  onBlur: PropTypes.func.isRequired
};
