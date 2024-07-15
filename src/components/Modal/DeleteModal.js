// src/components/DeleteModal.js

import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

import MyModal from './MyModal';

const DeleteModal = ({
  open,
  handleClose,
  subTitle,
  onOk,
  onCancel,
  isLoading,
}) => {
  return (
    <MyModal
      open={open}
      handleClose={handleClose}
      title="Confirm Deletion"
      subTitle={subTitle}
      okButtonText="Delete"
      okButtonIcon={<DeleteIcon />}
      cancelButtonText="Cancel"
      onOk={onOk}
      onCancel={onCancel}
      isLoading={isLoading}
      okButtonColor="error"
    />
  );
};

export default DeleteModal;
