// src/components/PasswordInput.js

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const PasswordInput = ({ value, onChange, minLength }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused) {
      if (value.length < minLength) {
        setError(true);
        setHelperText(`Minimum ${minLength} characters`);
      } else {
        setError(false);
        setHelperText("");
      }
    }
  }, [value, minLength, focused]);
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
    />
  );
};

export default PasswordInput;
