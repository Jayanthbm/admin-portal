import React from "react";
import MyModal from "./MyModal";

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
      cancelButtonText="Cancel"
      onOk={onOk}
      onCancel={onCancel}
      isLoading={isLoading}
      okButtonColor="error"
    />
  );
};

export default DeleteModal;
