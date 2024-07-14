// src/components/MyModal.js

import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
const MyModal = ({
  children,
  open,
  handleClose,
  title,
  titleVariant = "h6",
  subTitle,
  okButtonText,
  okButtonColor = "primary",
  okButtonIcon,
  okButtondisabled = false,
  cancelButtonText,
  onOk,
  onCancel,
  cancelButtonColor = "primary",
  isLoading = false,
}) => {
  okButtonIcon = okButtonIcon ? okButtonIcon : <SaveIcon />;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <>
          <Typography variant={titleVariant} gutterBottom>
            {title}
          </Typography>
          {subTitle && <Typography variant="body2">{subTitle}</Typography>}
          {children}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={onCancel}
              variant="outlined"
              color={cancelButtonColor}
              disabled={isLoading}
            >
              {cancelButtonText}
            </Button>
            <LoadingButton
              onClick={onOk}
              variant="contained"
              color={okButtonColor}
              loading={isLoading}
              loadingPosition="start"
              startIcon={okButtonIcon}
              disabled={okButtondisabled}
            >
              {okButtonText}
            </LoadingButton>
          </Box>
        </>
      </Box>
    </Modal>
  );
};

export default MyModal;
