// src/components/PasswordInput.js

import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const PasswordInput = ({
  value,
  onChange,
  minLength,
  setValidationState,
  disabled = false,
  autoComplete,
}) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [focused, setFocused] = useState(false);
  setValidationState = setValidationState || (() => {});
  minLength = minLength || 6;
  useEffect(() => {
    if (focused) {
      if (value?.length < minLength) {
        setError(true);
        setHelperText(`Minimum ${minLength} characters`);
        setValidationState(false);
      } else {
        setError(false);
        setHelperText('');
        setValidationState(true);
      }
    }
  }, [value, minLength, focused, setValidationState]);
  return (
    <TextField
      label="Password"
      type="password"
      fullWidth
      required
      margin="normal"
      value={value}
      onChange={onChange}
      placeholder="Enter your password"
      helperText={helperText}
      error={error}
      onFocus={() => {
        setFocused(true);
      }}
      disabled={disabled}
      autoComplete={autoComplete ? autoComplete : 'current-password'}
    />
  );
};

export default PasswordInput;
