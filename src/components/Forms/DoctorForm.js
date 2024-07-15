// src/components/Forms/DoctorForm.js

import { InputLabel, MenuItem, Select } from '@mui/material';
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
  const [speciality_id, setSpeciality_id] = useState(
    item.speciality_id || null
  );
  const [options, setOptions] = useState([]);

  const fetchOptions = useCallback(async () => {
    await getItems({
      url: API_ENDPOINTS.ALLSPECIALITIES,
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
      speciality_id,
      status: item.status === 1 ? true : false,
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
          speciality_id
      );
    }
  }, [
    email,
    password,
    name,
    mobile,
    medical_registration_number,
    speciality_id,
    id,
    setItem,
    mode,
    isValid,
    isValidEmail,
    isValidPassword,
    item,
  ]);

  return (
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
        disabled={mode === 'edit'}
      />
      <PasswordInput
        value={mode === 'edit' ? '***********' : password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        label="Password"
        setValidationState={setIsValidPassword}
        disabled={mode === 'edit'}
      />

      <CustomTextInput
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        id="mobile"
        label="Doctor Phone"
        setValidationState={() => {}}
        inputType="mobile"
        disabled={mode === 'edit'}
      />
      <CustomTextInput
        value={medical_registration_number}
        onChange={(e) => setMedical_registration_number(e.target.value)}
        id="medical_registration_number"
        label="Medical Registration Number"
        setValidationState={() => {}}
        inputType="text"
        disabled={mode === 'edit'}
      />
      <InputLabel id="doctor-specialty-label">Specialty</InputLabel>
      <Select
        labelId="doctor-specialty-label"
        id="doctor-specialty"
        value={speciality_id}
        label="Specialty"
        onChange={(e) => setSpeciality_id(e.target.value)}
        sx={{
          width: '100%',
        }}
        disabled={mode === 'edit'}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default DoctorForm;
