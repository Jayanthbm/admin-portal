// src/components/Forms/DoctorForm.js

import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { API_ENDPOINTS } from '../../constants';
import { getItems } from '../../helpers/api.handler';
import CustomTextInput from '../Input/CustomTextInput';
import EmailInput from '../Input/EmailInput';
import PasswordInput from '../Input/PasswordInput';

const DoctorForm = ({ mode, item, setItem, isValid }) => {
  const [email, setEmail] = useState(item.email || '');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState(item.password || '');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [name, setName] = useState(item.name || '');
  const [mobile, setMobile] = useState(item.mobile || '');
  const [medical_registration_number, setMedical_registration_number] =
    useState(item.medical_registration_number || '');
  const [specialty_id, setSpecialty_id] = useState(item.specialty_id || '-1');
  const [options, setOptions] = useState([]);

  const fetchOptions = useCallback(async () => {
    await getItems({
      url: API_ENDPOINTS.ALLSPECIALTIES,
      loadingFunction: () => {},
      snackBarFunction: null,
      dataSetterState: setOptions,
      commonFunction: () => {},
      force: true,
    });
  }, []);

  const id = item.id;
  useEffect(() => {
    fetchOptions();
  }, [id, fetchOptions]);

  useEffect(() => {
    setItem({
      ...item,
      email,
      password,
      name,
      mobile,
      medical_registration_number,
      specialty_id,
      enabled: item.enabled === 1 ? true : false,
    });
    if (mode === 'edit') {
      isValid(name?.length > 0);
    } else {
      isValid(
        isValidEmail &&
          isValidPassword &&
          name?.length > 0 &&
          medical_registration_number?.length > 0 &&
          mobile?.length > 0 &&
          mobile?.length === 10 &&
          specialty_id !== '-1'
      );
    }
  }, [
    email,
    password,
    name,
    mobile,
    medical_registration_number,
    specialty_id,
    id,
    setItem,
    mode,
    isValid,
    isValidEmail,
    isValidPassword,
    item,
  ]);

  return (
    <Box component="form">
      {mode === 'add' ? (
        <>
          <CustomTextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            label="Doctor Name"
            setValidationState={() => {}}
            inputType="text"
          />
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email"
            setValidationState={setIsValidEmail}
            autoComplete="email"
          />
          <PasswordInput
            value={mode === 'edit' ? '***********' : password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Password"
            setValidationState={setIsValidPassword}
            autoComplete="new-password"
          />

          <CustomTextInput
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            id="mobile"
            label="Doctor Phone"
            setValidationState={() => {}}
            inputType="mobile"
          />
          <CustomTextInput
            value={medical_registration_number}
            onChange={(e) => setMedical_registration_number(e.target.value)}
            id="medical_registration_number"
            label="Medical Registration Number"
            setValidationState={() => {}}
            inputType="text"
          />
          <InputLabel id="doctor-specialty-label">Specialty</InputLabel>
          <Select
            labelId="doctor-specialty-label"
            id="doctor-specialty"
            value={specialty_id}
            label="Specialty"
            onChange={(e) => setSpecialty_id(e.target.value)}
            sx={{
              width: '100%',
            }}
          >
            <MenuItem value={'-1'}>None</MenuItem>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <>
          <CustomTextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            label="Doctor Name"
            setValidationState={() => {}}
            inputType="text"
          />
        </>
      )}
    </Box>
  );
};

export default DoctorForm;
