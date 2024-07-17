// src/components/Forms/DoctorSubscriptionForm.js

import {
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { API_ENDPOINTS } from '../../constants';
import { useSnackbar } from '../../context/snackbar.context';
import { getItems } from '../../helpers/api.handler';
import { formatDate } from '../../helpers/util.helper';

const DoctorSubscriptionForm = ({
  setItem,
  isValid,
  speciality_id,
  mode,
  item,
  editedItem,
  setEditedItem,
}) => {
  const snackbar = useSnackbar();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxPatients, setMaxPatients] = useState('');
  const [allowMultipleSubspecialities, setAllowMultipleSubspecialities] =
    useState(false);
  const [subSpecialities, setSubSpecialities] = useState([]);
  const [price, setPrice] = useState('');

  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('-1');
  const [subSpecialitiesOptions, setSubSpecialitiesOptions] = useState([]);

  const fetchSubscriptions = useCallback(async () => {
    await getItems({
      url: API_ENDPOINTS.SUBSCRIPTIONS,
      loadingFunction: () => {},
      snackBarFunction: null,
      dataSetterState: setSubscriptions,
      commonFunction: () => {},
      force: true,
    });
  }, []);

  const fetchSubSpecialities = useCallback(async (speciality_id) => {
    await getItems({
      url: `${API_ENDPOINTS.ALLSPECIALITIES}/${speciality_id}`,
      loadingFunction: () => {},
      snackBarFunction: null,
      dataSetterState: setSubSpecialitiesOptions,
      commonFunction: () => {},
      force: true,
    });
  }, []);

  useEffect(() => {
    fetchSubscriptions();
    if (speciality_id) {
      fetchSubSpecialities(speciality_id);
    }
  }, [fetchSubscriptions, fetchSubSpecialities, speciality_id]);

  useEffect(() => {
    if (mode === 'add') {
      if (selectedSubscription && selectedSubscription !== '-1') {
        if (selectedSubscription === 'custom') {
          setPrice(null);
          setMaxPatients(null);
          setAllowMultipleSubspecialities(false);
          setSubSpecialities([]);
          setEndDate(null);
        } else {
          const subscription = subscriptions.find(
            (subscription) => subscription.id === selectedSubscription
          );
          setPrice(parseFloat(subscription.price));
          setMaxPatients(subscription.max_patients);
          setAllowMultipleSubspecialities(
            !!subscription.allow_multiple_subspecialities
          );
          setSubSpecialities([]);
          if (startDate) {
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + subscription.duration);
            setEndDate(endDate.toISOString().split('T')[0]);
          }
        }
      }
    }
  }, [selectedSubscription, subscriptions, startDate, mode]);

  useEffect(() => {
    if (mode === 'add') {
      const subscription = subscriptions.find(
        (subscription) => subscription.id === selectedSubscription
      );

      setItem({
        start_date: startDate,
        end_date: endDate,
        max_patients: maxPatients,
        allow_multiple_subspecialities: allowMultipleSubspecialities,
        sub_specialities:
          typeof subSpecialities === 'string' ||
          typeof subSpecialities === 'number'
            ? [subSpecialities]
            : subSpecialities,
        price: price,
        name:
          selectedSubscription === '-1' || selectedSubscription === 'custom'
            ? 'Custom'
            : subscription.name,
      });

      isValid(
        startDate?.length > 0 &&
          endDate?.length > 0 &&
          maxPatients !== null &&
          allowMultipleSubspecialities !== null &&
          subSpecialities?.length > 0 &&
          price !== null
      );
    }
  }, [
    startDate,
    endDate,
    maxPatients,
    allowMultipleSubspecialities,
    subSpecialities,
    price,
    subscriptions,
    selectedSubscription,
    setItem,
    isValid,
    mode,
  ]);

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (new Date(value) > new Date(today)) {
      setStartDate(value);
    } else {
      snackbar('Start date must be after today.', 'warning');
    }
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    if (new Date(value) > new Date(startDate)) {
      setEndDate(value);
    } else {
      snackbar('End date must be after start date.', 'warning');
    }
  };

  useEffect(() => {
    if (allowMultipleSubspecialities === false && mode === 'add') {
      if (Array.isArray(subSpecialities)) {
        // trim the array to length 1
        setSubSpecialities(subSpecialities.slice(0, 1));
      }
    }
  }, [allowMultipleSubspecialities, subSpecialities, mode]);

  const [editendDate, setEditendDate] = useState('');
  const [editmaxPatients, setEditmaxPatients] = useState(item.max_patients);

  const handleEndEditDateChange = (e) => {
    const value = e.target.value;
    if (new Date(value) > new Date(item.start_date)) {
      setEditendDate(value);
    } else {
      snackbar('End date must be after start date.', 'warning');
    }
  };

  useEffect(() => {
    if (mode === 'edit') {
      setEditendDate(formatDate(item.end_date));
      setEditmaxPatients(item.max_patients);
    }
  }, [
    mode,
    item.end_date,
    item.max_patients,
    setEditendDate,
    setEditmaxPatients,
  ]);

  useEffect(() => {
    if (mode === 'edit') {
      setEditedItem({
        id: editedItem.id,
        end_date: editendDate,
        max_patients: editmaxPatients,
      });
      isValid(
        editendDate?.length > 0 &&
          editmaxPatients !== null &&
          editmaxPatients > 0
      );
    }
  }, [editendDate, editmaxPatients, mode, editedItem, isValid, setEditedItem]);
  return (
    <Box sx={{ mt: 2 }}>
      {mode === 'edit' ? (
        <>
          <TextField
            id="start-date-edit"
            label="Start Date"
            type="date"
            value={formatDate(item.start_date)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '100%', mb: 2 }}
            disabled={true}
          />
          <TextField
            id="end-date-edit"
            label="End Date"
            type="date"
            value={editendDate}
            onChange={handleEndEditDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '100%', mb: 2 }}
          />
          <TextField
            id="max-patients-edit"
            label="Max Patients"
            type="number"
            value={editmaxPatients}
            onChange={(e) => setEditmaxPatients(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter max patients"
            sx={{ width: '100%', mb: 2 }}
          />
        </>
      ) : (
        <>
          <TextField
            id="start-date"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '100%', mb: 2 }}
          />
          <InputLabel id="doctor-subscription-select-label">
            Subscription
          </InputLabel>
          <Select
            labelId="doctor-subscription-select-label"
            id="doctor-subscription-select"
            value={selectedSubscription}
            label="Choose Subscription"
            onChange={(e) => setSelectedSubscription(e.target.value)}
            sx={{
              width: '100%',
              mb: 2,
            }}
            disabled={!startDate}
          >
            <MenuItem key={'-1'} value={'-1'}>
              Choose Subscription
            </MenuItem>
            <MenuItem key={'custom'} value={'custom'}>
              Custom
            </MenuItem>
            {subscriptions?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {selectedSubscription !== '-1' && (
            <>
              <TextField
                id="price"
                label="Price"
                type="number"
                value={price || price === 0 ? price : ''}
                onChange={(e) => setPrice(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Enter price"
                sx={{ width: '100%', mb: 2 }}
                disabled={selectedSubscription !== 'custom'}
              />

              <TextField
                id="max-patients"
                label="Max Patients"
                type="number"
                value={maxPatients || ''}
                onChange={(e) => setMaxPatients(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Enter max patients"
                sx={{ width: '100%', mb: 2 }}
                disabled={selectedSubscription !== 'custom'}
              />

              <TextField
                id="end-date"
                label="End Date"
                type="date"
                value={endDate || ''}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: '100%', mb: 2 }}
                disabled={selectedSubscription !== 'custom'}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowMultipleSubspecialities}
                    onChange={(e) => {
                      setAllowMultipleSubspecialities(e.target.checked);
                    }}
                    disabled={selectedSubscription !== 'custom'}
                  />
                }
                label="Allow Multiple Subspecialities"
              />

              <InputLabel id="sub-specialities-select-label">
                Subspecialities
              </InputLabel>
              <Select
                labelId="sub-specialities-select-label"
                id="sub-specialities-select"
                multiple={allowMultipleSubspecialities}
                value={
                  allowMultipleSubspecialities
                    ? subSpecialities
                    : subSpecialities.length > 0
                      ? subSpecialities[0]
                      : ''
                }
                onChange={(e) => {
                  if (
                    Array.isArray(e.target.value) &&
                    e.target.value.includes('all')
                  ) {
                    setSubSpecialities(
                      subSpecialitiesOptions.map((item) => item.id)
                    );
                  } else if (
                    Array.isArray(e.target.value) &&
                    e.target.value.includes('remove')
                  ) {
                    setSubSpecialities([]);
                  } else {
                    setSubSpecialities(
                      allowMultipleSubspecialities
                        ? typeof e.target.value === 'string'
                          ? e.target.value.split(',')
                          : e.target.value
                        : [e.target.value]
                    );
                  }
                }}
                sx={{
                  width: '100%',
                  mb: 2,
                }}
                renderValue={(selected) => {
                  if (Array.isArray(selected)) {
                    const subSpecialityNames = subSpecialitiesOptions
                      ?.filter((item) => selected.includes(item.id))
                      .map((item) => item.name);
                    if (selected.length === subSpecialitiesOptions.length) {
                      return ['All Selected'];
                    } else {
                      return subSpecialityNames.join(', ');
                    }
                  } else {
                    const subSpeciality = subSpecialitiesOptions?.find(
                      (item) => item.id === selected
                    );
                    return subSpeciality?.name;
                  }
                }}
              >
                {allowMultipleSubspecialities &&
                Array.isArray(subSpecialities) &&
                subSpecialities?.length === subSpecialitiesOptions.length ? (
                  <MenuItem key={'-1'} value={'remove'}>
                    Remove All
                  </MenuItem>
                ) : (
                  <MenuItem key={'-1'} value={'all'}>
                    Select All
                  </MenuItem>
                )}
                {subSpecialitiesOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default DoctorSubscriptionForm;
