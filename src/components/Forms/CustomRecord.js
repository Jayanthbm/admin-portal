// src/components/Forms/CustomRecord.js

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
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
    'number',
    'date',
    'select',
    'radio',
    'checkbox',
    'slider',
    'image_upload',
  ];
  const IMAGE_FORMATS = ['jpg', 'png', 'jpeg'];
  const [fieldType, setFieldType] = useState(item.field_type || 'text');
  const [fieldName, setFieldName] = useState(item.field_name || '');
  const [minValue, setMinValue] = useState(item.min_value || 0);
  const [maxValue, setMaxValue] = useState(item.max_value || 10000);
  const [intervalValue, setIntervalValue] = useState(item.interval_value || 10);
  const [maxSize, setMaxSize] = useState(item.max_size || 0);
  const [format, setFormat] = useState(item.format || []);
  const [selectOptions, setSelectOptions] = useState(item.options || []);
  const [displayOrder, setDisplayOrder] = useState(
    item.display_order || index + 1
  );

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
        sub_specialty_id: sub_specialty_id,
        field_type: fieldType,
        field_name: fieldName,
        min_value: minValue,
        max_value: maxValue,
        interval_value: intervalValue,
        max_size: maxSize,
        format: format,
        options: selectOptions,
        display_order: displayOrder,
      });
    } else {
      return onAdd({
        sub_specialty_id: sub_specialty_id,
        field_type: fieldType,
        field_name: fieldName,
        min_value: minValue,
        max_value: maxValue,
        interval_value: intervalValue,
        max_size: maxSize,
        format: format,
        options: selectOptions,
        display_order: displayOrder,
      });
    }
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Card variant="outlined" sx={{ width: '100%', p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <TextField
                label="Display Order"
                value={displayOrder}
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setDisplayOrder(e.target.value);
                  } else {
                    setDisplayOrder(1);
                  }
                }}
                type="number"
                sx={{
                  width: '100px',
                }}
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
              />
            </Box>
            <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
              <Select
                labelId="field-type-label"
                id="field-type"
                value={fieldType}
                label="Field "
                onChange={(e) => {
                  setFieldType(e.target.value);
                }}
                sx={{ width: '100%' }}
                placeholder="Enter field type"
              >
                {FIELD_TYPES.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {fieldType === 'number' || fieldType === 'slider' ? (
              <>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <TextField
                    id="min-value"
                    label="Min Value"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    placeholder="Enter min value"
                  />
                </Box>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <TextField
                    id="max-value"
                    label="Max Value"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    placeholder="Enter max value"
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
                    />
                  </Box>
                ) : null}
              </>
            ) : null}
            {fieldType === 'image_upload' ? (
              <>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <TextField
                    id="max-size"
                    label="Max Size"
                    value={maxSize}
                    onChange={(e) => setMaxSize(e.target.value)}
                    placeholder="Enter max size"
                  />
                </Box>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <Select
                    labelId="format-label"
                    id="format"
                    multiple
                    value={format}
                    label="Format"
                    onChange={(e) => setFormat(e.target.value)}
                    sx={{ width: '100%' }}
                    placeholder="Enter format"
                  >
                    {IMAGE_FORMATS.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </>
            ) : null}
            {fieldType === 'select' ||
            fieldType === 'radio' ||
            fieldType === 'checkbox' ? (
              <>
                <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
                  <>
                    <TextField
                      id="Added Options"
                      select
                      label="Added Options"
                      value={'-1'}
                      defaultValue="-1"
                      onChange={() => {}}
                    >
                      <MenuItem key={'-1'} value={'-1'}>
                        Added Options
                      </MenuItem>
                      {selectOptions.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                </Box>
              </>
            ) : null}
          </Box>
          {fieldType === 'select' ||
          fieldType === 'radio' ||
          fieldType === 'checkbox' ? (
            <Box sx={{ ml: 1, mb: 2, mt: 1 }}>
              <>
                <Button
                  variant="contained"
                  sx={{ ml: 1, mb: 2, mt: 1 }}
                  color="success"
                  onClick={() => {
                    const newOptions = [...selectOptions];
                    newOptions.push({ value: '', label: '' });
                    setSelectOptions(newOptions);
                  }}
                  size="small"
                >
                  Add New Option
                </Button>
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
                    <Box sx={{ mr: 1, mb: 2, mt: 1 }}>
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
                      />
                    </Box>
                    <Box sx={{ mr: 1, mb: 2, mt: 1 }}>
                      <TextField
                        id={`value-${index}`}
                        label={`value ${index + 1}`}
                        value={item.value}
                        onChange={(e) => {
                          const newOptions = [...selectOptions];
                          newOptions[index].value = e.target.value;
                          setSelectOptions(newOptions);
                        }}
                        size="small"
                        placeholder="Enter Value"
                        helperText="Value Stored in Database"
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
                      <DeleteIcon fontSize="inherit" color="error" />
                    </IconButton>
                  </Box>
                ))}
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
