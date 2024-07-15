// src/components/EmailInput.js

import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { validateEmail } from '../../helpers/validation.helper';

const EmailInput = ({
  value,
  onChange,
  id,
  label,
  setValidationState,
  disabled = false,
}) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (focused) {
      if (!value) {
        setError(true);
        setHelperText('Please enter an email address');
        setValidationState(false);
      } else if (!validateEmail(value)) {
        setError(true);
        setHelperText('Please enter a valid email address');
        setValidationState(false);
      } else {
        setError(false);
        setHelperText('');
        setValidationState(true);
      }
    }
  }, [value, focused, setValidationState]);
  return (
    <TextField
      id={id}
      label={label ? label : 'Email'}
      type="email"
      fullWidth
      required
      margin="normal"
      value={value}
      onChange={onChange}
      placeholder="Enter your email"
      helperText={helperText}
      error={error}
      onFocus={() => {
        setFocused(true);
      }}
      disabled={disabled}
    />
  );
};

export default EmailInput;
