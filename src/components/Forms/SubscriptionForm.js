import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../CustomTextInput";

const SubscriptionForm = ({ item, setItem }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [max_patients, setMax_patients] = useState(item.max_patients);
  const [duration, setDuration] = useState(item.duration);
  const [allow_multiple_subspecialities, setAllow_multiple_subspecialities] =
    useState("no");
  const id = item.id;
  useEffect(() => {
    setItem({
      name,
      price: parseInt(price),
      max_patients: parseInt(max_patients),
      allow_multiple_subspecialities:
        allow_multiple_subspecialities === "yes" ? true : false,
      duration,
      id,
    });
  }, [
    name,
    price,
    max_patients,
    allow_multiple_subspecialities,
    duration,
    id,
    setItem,
  ]);
  return (
    <>
      <CustomTextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        label="Subscription Name"
        validationPassed={() => {}}
        inputType="text"
      />
      <CustomTextInput
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        id="price"
        label="Subscription Price"
        validationPassed={() => {}}
        inputType="number"
        minNumber={0}
        maxNumber={100000}
      />
      <CustomTextInput
        value={max_patients}
        onChange={(e) => setMax_patients(e.target.value)}
        id="max_patients"
        label="Max Patients"
        validationPassed={() => {}}
        inputType="number"
        minNumber={1}
        maxNumber={10000}
      />
      <CustomTextInput
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        id="duration"
        label="Duration(Days)"
        validationPassed={() => {}}
        inputType="number"
        minNumber={1}
        maxNumber={366}
      />
      <Typography variant="body2">Allow Multiple Subspecialities</Typography>
      <ToggleButtonGroup
        color="primary"
        value={allow_multiple_subspecialities}
        exclusive
        onChange={(e, value) => {
          setAllow_multiple_subspecialities(value);
        }}
        aria-label="Allow Multiple Subspecialities"
      >
        <ToggleButton value={"yes"}>Yes</ToggleButton>
        <ToggleButton value={"no"}>No</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default SubscriptionForm;
