import PropTypes from 'prop-types';

import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import {
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

import CustomTextFieldStyled from './CustomTextFiledStyled';

export default function PasswordInputWithFormik({
  id,
  name,
  onChange,
  onBlur,
  value,
  error,
  helperText,
  placeholder
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();
  return (
    <CustomTextFieldStyled
      fullWidth
      type={showPassword ? 'text' : 'password'}
      id={id}
      name={name}
      placeholder={placeholder}
      variant="standard"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={error}
      helperText={helperText || ' '}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

PasswordInputWithFormik.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  placeholder: PropTypes.string.isRequired
};
