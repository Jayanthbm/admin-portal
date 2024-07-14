import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import MyModal from "./MyModal";
const NewAdditonModal = ({
  open,
  handleClose,
  title,
  subTitle,
  okButtonText,
  onOk,
  onCancel,
  isLoading,
  okButtondisabled,
  children,
}) => {
  return (
    <MyModal
      open={open}
      handleClose={handleClose}
      title={title}
      subTitle={subTitle}
      okButtonText={okButtonText}
      cancelButtonText="Cancel"
      onOk={onOk}
      onCancel={onCancel}
      isLoading={isLoading}
      okButtonIcon={<SaveIcon />}
      okButtondisabled={okButtondisabled}
    >
      {children}
    </MyModal>
  );
};

export default NewAdditonModal;
