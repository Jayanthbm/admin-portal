// src/componets/CustomTextInput.js

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const CustomTextInput = ({
  value,
  onChange,
  id,
  label,
  validationPassed,
  inputType,
  minNumber = 0,
  maxNumber = 100000000,
}) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (focused) {
      if (!value) {
        setError(true);
        setHelperText(`Please enter ${label}`);
        validationPassed(false);
      } else if (inputType == "number") {
        if (value < minNumber || value > maxNumber) {
          setError(true);
          setHelperText(
            `Please enter a number between ${minNumber} and ${maxNumber}`
          );
          validationPassed(false);
        } else {
          setError(false);
          setHelperText("");
          validationPassed(true);
        }
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
      label={label ? label : "Input"}
      type={inputType}
      fullWidth
      required
      margin="normal"
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      helperText={helperText}
      error={error}
      onFocus={() => {
        setFocused(true);
      }}
    />
  );
};

export default CustomTextInput;
