// src/components/EmailInput.js

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateEmail } from "../helpers/validation.helper";

const EmailInput = ({ value, onChange, id, label, validationPassed }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (focused) {
      if (!value) {
        setError(true);
        setHelperText("Please enter an email address");
        validationPassed(false);
      } else if (!validateEmail(value)) {
        setError(true);
        setHelperText("Please enter a valid email address");
        validationPassed(false);
      } else {
        setError(false);
        setHelperText("");
        validationPassed(true);
      }
    }
  }, [value, focused, validationPassed]);
  return (
    <TextField
      id={id}
      label={label ? label : "Email"}
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
    />
  );
};

export default EmailInput;
