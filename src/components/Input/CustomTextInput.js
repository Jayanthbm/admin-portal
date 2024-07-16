// src/componets/CustomTextInput.js

import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CustomTextInput = ({
  value,
  onChange,
  id,
  label,
  setValidationState,
  inputType,
  minLength = 0,
  maxLength = 100000,
  minNumber = 0,
  maxNumber = 100000000,
  required = true,
  disabled = false,
  readOnly = false,
}) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (focused) {
      switch (inputType) {
        case 'number': {
          if (value < minNumber || value > maxNumber) {
            setError(true);
            setHelperText(
              `Please enter a number between ${minNumber} and ${maxNumber}`
            );
            setValidationState(false);
          } else {
            setError(false);
            setHelperText('');
            setValidationState(true);
          }
          break;
        }
        case 'text': {
          if (value.length < minLength || value.length > maxLength) {
            setError(true);
            setHelperText(
              `Please enter a text between ${minLength} and ${maxLength} characters`
            );
            setValidationState(false);
          } else {
            setError(false);
            setHelperText('');
            setValidationState(true);
          }
          break;
        }
        case 'mobile': {
          if (value.length !== 10 || isNaN(value)) {
            setError(true);
            setHelperText('Please enter a valid mobile number');
            setValidationState(false);
          } else {
            setError(false);
            setHelperText('');
            setValidationState(true);
          }
          break;
        }
        default: {
          setError(false);
          setHelperText('');
          setValidationState(true);
        }
      }
    } else {
      if (value) {
        setError(false);
        setHelperText('');
        setValidationState(true);
      }
    }
  }, [
    value,
    focused,
    setValidationState,
    maxNumber,
    minNumber,
    maxLength,
    minLength,
    inputType,
    label,
  ]);
  return (
    <TextField
      id={id}
      label={label ? label : 'Input'}
      type={inputType}
      fullWidth
      required={required}
      margin="normal"
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      helperText={helperText}
      error={error}
      onFocus={() => {
        setFocused(true);
      }}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export default CustomTextInput;
