// src/components/Forms/CustomRecord.js

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import IOSSwitch from '../IosSwitch';
const CustomRecord = ({
  sub_specialty_id,
  item,
  index,
  removeItem,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const FIELD_TYPES = [
    'text',
    'freetext',
    'number',
    'slider',
    'select',
    'radio',
    'checkbox',
    'rating',
    'image_upload',
    'date',
  ];
  const [displayOrder, setDisplayOrder] = useState(
    item.display_order || index + 1
  );
  const [required, setRequired] = useState(
    item?.is_required === 1 ? true : false || false
  );
  const [fieldType, setFieldType] = useState(item.field_type || 'text');
  const [fieldName, setFieldName] = useState(item.field_name || '');
  const [fieldLabel, setFieldLabel] = useState(item.field_label || '');
  const [defaultValue, setDefaultValue] = useState(item.default_value || '');
  const [minValue, setMinValue] = useState(item.min_value || 0);
  const [maxValue, setMaxValue] = useState(item.max_value || 10000);
  const [intervalValue, setIntervalValue] = useState(item.interval_value || 10);
  const [selectOptions, setSelectOptions] = useState(item.options || []);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const handleDelete = () => {
    if (item.id) {
      return onDelete(item.id);
    } else {
      return removeItem(index);
    }
  };

  const handleSubmit = () => {
    if (item.id) {
      return onUpdate({
        ...item,
        display_order: displayOrder,
        is_required: required,
        field_type: fieldType,
        field_name: fieldName,
        field_label: fieldLabel,
        default_value: defaultValue,
        min_value: minValue,
        max_value: maxValue,
        interval_value: intervalValue,
        options: selectOptions,
      });
    } else {
      return onAdd({
        sub_specialty_id: sub_specialty_id,
        display_order: displayOrder,
        is_required: required,
        field_type: fieldType,
        field_name: fieldName,
        field_label: fieldLabel,
        default_value: defaultValue,
        min_value: minValue,
        max_value: maxValue,
        interval_value: intervalValue,
        options: selectOptions,
      });
    }
  };

  useEffect(() => {
    function init() {
      function setOptions() {
        if (fieldType === item.field_type && item.options?.length > 0) {
          setSelectOptions(item.options);
        } else {
          setSelectOptions([
            {
              label: '',
              value: '',
            },
          ]);
        }
        return;
      }

      function setValues() {
        if (fieldType === item.field_type) {
          setMinValue(item.min_value);
          setMaxValue(item.max_value);
          setIntervalValue(item.interval_value);
        } else {
          setMinValue(0);
          let maxValue =
            fieldType === 'slider' ? 100 : fieldType === 'rating' ? 5 : 1000;
          setMaxValue(maxValue);
          let intervalValue = fieldType === 'slider' ? 10 : 0;
          setIntervalValue(intervalValue);
        }
        return;
      }
      switch (fieldType) {
        case 'text': {
          break;
        }
        case 'freetext': {
          break;
        }
        case 'number': {
          setValues();
          break;
        }
        case 'slider': {
          setValues();
          break;
        }
        case 'rating': {
          setValues();
          break;
        }
        case 'select': {
          setOptions();
          break;
        }
        case 'radio': {
          setOptions();
          break;
        }
        case 'checkbox': {
          setOptions();
          break;
        }
        case 'image_upload': {
          break;
        }
        case 'date': {
          break;
        }
      }

      setLoaded(true);
      setSubmitButtonDisabled(false);
    }
    init();
  }, [
    fieldType,
    item.id,
    item.field_type,
    item.options,
    item.min_value,
    item.max_value,
    item.interval_value,
  ]);
  useEffect(() => {
    function checkConditions() {
      if (isNaN(displayOrder)) {
        return true;
      }
      if (fieldName?.trim() === '' || fieldLabel?.trim() === '') {
        return true;
      }
      if (isNaN(minValue) || isNaN(maxValue) || isNaN(intervalValue)) {
        return true;
      }
      if (fieldType === 'number' || fieldType === 'rating') {
        if (
          minValue < 0 ||
          maxValue < 0 ||
          minValue > maxValue ||
          isNaN(defaultValue) ||
          defaultValue > maxValue
        ) {
          return true;
        }
      }
      if (fieldType === 'slider') {
        if (
          minValue < 0 ||
          maxValue < 0 ||
          minValue > maxValue ||
          intervalValue <= 0 ||
          intervalValue > maxValue ||
          isNaN(defaultValue) ||
          defaultValue > maxValue
        ) {
          return true;
        }
      }
      if (
        fieldType === 'select' ||
        fieldType === 'radio' ||
        fieldType === 'checkbox'
      ) {
        if (selectOptions.length === 0) {
          return true;
        } else {
          for (let i = 0; i < selectOptions.length; i++) {
            let item = selectOptions[i];
            if (item.label?.trim() === '' || item.value?.trim() === '') {
              return true;
            }
          }
        }
      }
      return false;
    }
    if (loaded === true) {
      const result = checkConditions();
      setSubmitButtonDisabled(result);
    }
  }, [
    loaded,
    displayOrder,
    fieldType,
    fieldName,
    fieldLabel,
    defaultValue,
    minValue,
    maxValue,
    intervalValue,
    selectOptions,
  ]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Card variant="outlined" sx={{ width: '100%', p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
            <Box>
              <TextField
                label="Display Order"
                value={displayOrder}
                onChange={(e) => {
                  setDisplayOrder(e.target.value);
                }}
                type="number"
                sx={{
                  width: '100px',
                }}
                size="small"
                required={true}
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Is Required"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
              pt: 2,
              pb: 2,
              ml: 2,
            }}
          >
            <Box sx={{ mr: 1, mb: 2, mt: 1 }}>
              <TextField
                id="field-name"
                label="Field Name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="Enter field name"
                helperText="Identifier for the field,unique value"
                disabled={item.id ? true : false}
                size="small"
                required={true}
              />
            </Box>
            <Box sx={{ mr: 1, mb: 2, mt: 1 }}>
              <TextField
                id="field-label"
                label="Field Label"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                placeholder="Enter field label"
                helperText="Display name for the field"
                size="small"
                required={true}
              />
            </Box>

            <Box sx={{ mr: 1, mb: 2, mt: 1 }}>
              <TextField
                id="field-type"
                select
                label="Field Types"
                value={fieldType}
                onChange={(e) => {
                  setLoaded(false);
                  setFieldType(e.target.value);
                  if (
                    e.target.value === 'select' ||
                    e.target.value === 'radio' ||
                    e.target.value === 'checkbox'
                  ) {
                    setExpanded(true);
                  }
                }}
                helperText="Input field type"
                size="small"
                required={true}
              >
                {FIELD_TYPES.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mr: 1, mb: 2, mt: 1 }}>
              <TextField
                id="default-value"
                label="Default Value"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
                placeholder="Enter default value"
                helperText="Default value for the field"
                size="small"
                type={
                  fieldType === 'number' ||
                  fieldType === 'rating' ||
                  fieldType === 'slider'
                    ? 'number'
                    : 'text'
                }
              />
            </Box>
            {fieldType === 'number' ||
            fieldType === 'slider' ||
            fieldType === 'rating' ? (
              <>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <TextField
                    id="min-value"
                    label="Min Value"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    placeholder="Enter min value"
                    helperText="Minimum value for the field"
                    size="small"
                    type="number"
                  />
                </Box>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <TextField
                    id="max-value"
                    label="Max Value"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    placeholder="Enter max value"
                    helperText="Maximum value for the field"
                    size="small"
                    type="number"
                    required={true}
                  />
                </Box>
                {fieldType === 'slider' ? (
                  <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                    <TextField
                      id="interval-value"
                      label="Interval Value"
                      value={intervalValue}
                      onChange={(e) => setIntervalValue(e.target.value)}
                      placeholder="Enter interval value"
                      helperText="Interval value for the field"
                      size="small"
                      type="number"
                      required={true}
                    />
                  </Box>
                ) : null}
              </>
            ) : null}
            {fieldType === 'select' ||
            fieldType === 'radio' ||
            fieldType === 'checkbox' ? (
              <>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <TextField
                    id="Added Options"
                    select
                    label="Added Options"
                    value={'-1'}
                    defaultValue="-1"
                    onChange={() => {}}
                    helperText="Added Options for the field"
                    size="small"
                  >
                    <MenuItem key={'-1'} value={'-1'}>
                      {selectOptions.length} Options Added
                    </MenuItem>
                    {selectOptions.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </>
            ) : null}
          </Box>
          {fieldType === 'select' ||
          fieldType === 'radio' ||
          fieldType === 'checkbox' ? (
            <Box sx={{ ml: 2, mt: 0 }}>
              <>
                <Accordion
                  slotProps={{ transition: { unmountOnExit: true } }}
                  expanded={expanded}
                  onChange={() => setExpanded(!expanded)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 'auto', mb: 'auto' }}
                    >
                      Added Options ({selectOptions.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <IconButton
                      aria-label="add-option"
                      size="medium"
                      onClick={() => {
                        const newOptions = [...selectOptions];
                        newOptions.push({ value: '', label: '' });
                        setSelectOptions(newOptions);
                      }}
                    >
                      <Tooltip title="Add New Option to Field">
                        <AddCircleIcon fontSize="inherit" color="success" />
                      </Tooltip>
                    </IconButton>
                    {selectOptions.map((item, index) => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignContent: 'center',
                          flexWrap: 'wrap',
                          alignItems: 'flex-start',
                          pt: 2,
                          pb: 2,
                          ml: 2,
                        }}
                        key={index}
                      >
                        <Box sx={{ mr: 1 }}>
                          <TextField
                            id={`label-${index}`}
                            label={`Label ${index + 1}`}
                            value={item.label}
                            onChange={(e) => {
                              const newOptions = [...selectOptions];
                              newOptions[index].label = e.target.value;
                              setSelectOptions(newOptions);
                            }}
                            size="small"
                            placeholder="Enter label"
                            helperText="Label Shown on UI"
                            required={true}
                          />
                        </Box>
                        <Box sx={{ mr: 1 }}>
                          <TextField
                            id={`value-${index}`}
                            label={`Value ${index + 1}`}
                            value={item.value}
                            onChange={(e) => {
                              const newOptions = [...selectOptions];
                              newOptions[index].value = e.target.value;
                              setSelectOptions(newOptions);
                            }}
                            size="small"
                            placeholder="Enter Value"
                            helperText="Value Stored in Database"
                            required={true}
                          />
                        </Box>
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => {
                            const newOptions = [...selectOptions];
                            newOptions.splice(index, 1);
                            setSelectOptions(newOptions);
                          }}
                        >
                          <Tooltip title="Delete Option">
                            <DeleteIcon fontSize="inherit" color="error" />
                          </Tooltip>
                        </IconButton>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </>
            </Box>
          ) : null}
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignContent: 'center',
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              color={item.id ? 'error' : 'warning'}
              onClick={handleDelete}
              size="small"
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              color={item.id ? 'primary' : 'success'}
              onClick={handleSubmit}
              size="small"
              disabled={submitButtonDisabled}
            >
              {item.id ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default CustomRecord;
