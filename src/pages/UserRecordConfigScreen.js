// src/pages/UserRecordConfigScreen.js

import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CustomRecord from '../components/Forms/CustomRecord';
import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import { API_ENDPOINTS } from '../constants';
import { useSnackbar } from '../context/snackbar.context';
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from '../helpers/api.handler';
const UserRecordConfigScreen = () => {
  const [loading, setLoading] = useState(true);
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const state = location?.state;
  const [data, setData] = useState([]);

  const [speaclties, setSpecialties] = useState([]);
  const [speacltyId, setSpecialtyId] = useState(-1);
  const [subSpecialties, setSubSpecialties] = useState([]);
  const [subSpecialtyId, setSubSpecialtyId] = useState(
    state?.subSpecialtyId || -1
  );

  const fetchSpecialties = useCallback(async () => {
    await getItems({
      url: API_ENDPOINTS.ALLSPECIALTIES,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setSpecialties,
      commonFunction: () => {},
      force: false,
    });
  }, []);

  const fetchSubSpecialties = useCallback(async () => {
    await getItems({
      url: `${API_ENDPOINTS.ALLSPECIALTIES}/${speacltyId}`,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setSubSpecialties,
      commonFunction: () => {},
      force: false,
    });
  }, [speacltyId]);

  const fetchItems = useCallback(
    async (force) => {
      await getItems({
        url: `${API_ENDPOINTS.USER_RECORD_CONFIG}/${subSpecialtyId}`,
        loadingFunction: setLoading,
        snackBarFunction: null,
        dataSetterState: setData,
        commonFunction: () => {},
        force: force,
      });
    },
    [subSpecialtyId]
  );

  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  useEffect(() => {
    if (speacltyId && speacltyId !== -1 && subSpecialtyId === -1) {
      fetchSubSpecialties();
      setActiveStep(1);
    }
  }, [speacltyId, fetchSubSpecialties, subSpecialtyId]);

  useEffect(() => {
    if (subSpecialtyId && subSpecialtyId !== -1) {
      fetchItems(true);
      setActiveStep(2);
    }
  }, [subSpecialtyId, fetchItems]);

  const steps = [
    'Select Speaclty',
    'Choose Sub Speaclty',
    'Create Record Configuration',
  ];
  const [activeStep, setActiveStep] = useState(0);

  const newItem = (index) => {
    let current_data = data;
    let newItem = {
      display_order: data.length + 1,
      field_name: '',
      field_label: '',
      field_type: null,
      unit_type: 'none',
      default_value: '',
      min_value: 0,
      max_value: 99999999,
      interval_value: 10,
      options: [],
      validation_pattern: '',
      help_text: '',
      is_required: 0,
      is_visible: 1,
      allowed_file_types: '',
      max_files: 1,
    };
    if (index === -1) {
      current_data.unshift(newItem);
    } else if (index !== null && index < data.length) {
      current_data.splice(index + 1, 0, newItem);
    } else {
      current_data.push(newItem);
    }
    setData([...current_data]);
  };

  const removeItem = (index) => {
    let current_data = data;
    current_data.splice(index, 1);
    setData([...current_data]);
  };

  const handleAdd = async (item) => {
    return await addItem({
      url: `${API_ENDPOINTS.USER_RECORD_CONFIG}`,
      data: item,
      loadingFunction: () => {},
      snackBarFunction: showSnackbar,
      reloadData: () => {},
      commonFunction: () => {},
    });
  };

  const handleUpdate = async (item) => {
    return await updateItem({
      url: `${API_ENDPOINTS.USER_RECORD_CONFIG}/${item.id}`,
      data: item,
      loadingFunction: () => {},
      snackBarFunction: showSnackbar,
      reloadData: () => {},
      commonFunction: () => {},
    });
  };

  const handleDelete = async (id) => {
    return await deleteItem({
      url: `${API_ENDPOINTS.USER_RECORD_CONFIG}/${id}`,
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
      },
      commonFunction: () => {},
    });
  };

  const onRefresh = () => {
    if (subSpecialtyId !== -1) {
      fetchItems(true);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageTitle title="Record Configuration" onRefresh={onRefresh} />
      <CustomBreadCrumb
        paths={[
          {
            title: 'Record Config',
            icon: <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
          },
        ]}
      />
      <Box sx={{ width: '100%', mt: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (index === activeStep) {
              labelProps.completed = true;
            }
            if (index < activeStep) {
              stepProps.completed = true;
            }
            return (
              <Step
                key={label}
                {...stepProps}
                onClick={() => {
                  if (index === 0 && activeStep > 0) {
                    setActiveStep(0);
                    setSpecialtyId(-1);
                  } else if (index === 1 && activeStep > 1) {
                    setActiveStep(1);
                    setSubSpecialtyId(-1);
                  }
                }}
              >
                <StepLabel
                  {...labelProps}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && (
          <Box sx={{ mt: 2 }}>
            <Select
              labelId="doctor-specialty-label"
              id="doctor-specialty"
              value={speacltyId}
              label="Specialty"
              onChange={(e) => {
                if (e.target.value !== '-1') {
                  setSpecialtyId(e.target.value);
                  setActiveStep(1);
                }
              }}
              sx={{
                width: '100%',
              }}
            >
              <MenuItem key={'-1'} value={'-1'}>
                Choose Specialty
              </MenuItem>
              {speaclties.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
        {activeStep === 1 && (
          <Box sx={{ mt: 2 }}>
            <Select
              labelId="doctor-sub-specialty-label"
              id="doctor-sub-specialty"
              value={subSpecialtyId}
              label="Sub Specialty"
              onChange={(e) => {
                if (e.target.value !== '-1') {
                  setSubSpecialtyId(e.target.value);
                  setActiveStep(2);
                }
              }}
              sx={{
                width: '100%',
              }}
            >
              <MenuItem key={'-1'} value={'-1'}>
                Choose Sub Specialty
              </MenuItem>
              {subSpecialties.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
        {activeStep === 2 && (
          <MyPageLayout
            isLoading={loading}
            showSkeleton={data?.length > 0 ? false : true}
            data={data}
            showNoDataCard={data?.length === 0}
            noPageTitle="No Items"
            noPageButton={newItem}
            noPageButtonTitle="Add Item"
          >
            <Typography variant="h6" textAlign={'center'}>
              Items Need to be Refreshed Manually
            </Typography>
            <Button variant="contained" color="primary" onClick={newItem}>
              Add Item
            </Button>
            <Box sx={{ mt: 2 }}>
              {data?.map((item, index) => (
                <CustomRecord
                  key={index}
                  sub_specialty_id={subSpecialtyId}
                  item={item}
                  index={index}
                  removeItem={removeItem}
                  onAdd={handleAdd}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </Box>
          </MyPageLayout>
        )}
      </Box>
    </Box>
  );
};

export default UserRecordConfigScreen;
