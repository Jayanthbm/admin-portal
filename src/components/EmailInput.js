// src/components/EmailInput.js

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateEmail } from "../helpers/validation.helper";

const EmailInput = ({ value, onChange }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (focused) {
      if (!value) {
        setError(true);
        setHelperText("Please enter an email address");
      } else if (!validateEmail(value)) {
        setError(true);
        setHelperText("Please enter a valid email address");
      } else {
        setError(false);
        setHelperText("");
      }
    }
  }, [value]);
  return (
    <TextField
      label="Email"
      type="email"
      fullWidth
      required
      margin="normal"
      value={value}
      onChange={onChange}
      placeholder="Enter your email"
      helprafceerText={helperText}
      error={error}
      onFocus={() => {
        setFocused(true);
      }}
    />
  );
};

export default EmailInput;
