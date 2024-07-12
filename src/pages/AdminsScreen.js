// src/pages/AdminsScreen.js

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import EmailInput from "../components/EmailInput";
import MyModal from "../components/MyModal";
import PageLoader from "../components/PageLoader";
import PageTitle from "../components/PageTitle";
import PasswordInput from "../components/PasswordInput";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { useSnackbar } from "../context/snackbar.context";
import { del, get, patch, post } from "../helpers/api.helper";
import useAuthNavigation from "../hooks/useAuthNavigation";
import { addItem, getItems, updateItem } from "../helpers/api.handler";
import { getItemById } from "../helpers/util.helper";
const AdminsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.ADMINS);
  const showSnackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [validNewAdminEmail, setValidNewAdminEmail] = useState(false);
  const [validNewAdminPassword, setValidNewAdminPassword] = useState(false);

  const fetchItems = async () => {
    return await getItems({
      url: API_ENDPOINTS.ALLADMINS,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setAdmins,
      commonFunction: () => {},
    });
  };

  useEffect(() => {
    // Fetch initial data from API
    fetchItems();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(null);
    setNewAdminEmail("");
    setNewAdminName("");
    setNewAdminPassword("");
    setValidNewAdminEmail(false);
    setValidNewAdminPassword(false);
  };

  const handleAdd = async () => {
    return await addItem({
      url: API_ENDPOINTS.ADDADMIN,
      data: {
        email: newAdminEmail,
        name: newAdminName,
        password: newAdminPassword,
      },
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: fetchItems,
      commonFunction: () => {
        handleClose();
      },
    });
  };

  const handleEditChange = (id, name) => {
    setAdmins(
      admins.map((admin) => (admin.id === id ? { ...admin, name } : admin))
    );
  };

  const handleUpdate = async (id) => {
    const item = getItemById(admins, id);
    return await updateItem({
      url: API_ENDPOINTS.UPDATEADMIN + `/${item.id}`,
      data: {
        name: item.name,
        enabled: item.enabled === 1 ? true : false,
      },
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: fetchItems,
      commonFunction: () => {
        handleClose();
        setEditMode(null);
      },
    });
  };

  const confirmDeleteModal = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const deleteAdmin = async () => {
    const { id } = confirmDelete;
    setConfirmDelete({ open: false, id: null });
    try {
      const result = await del(API_ENDPOINTS.DELETEADMIN + `/${id}`);
      if (result.status === 200) {
        showSnackbar(result.message, "success");
        await fetchItems();
        setConfirmDelete({ open: false, id: null });
      } else {
        showSnackbar(result.message, "error");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const disableEnableAdmin = async (id) => {
    try {
      let admin = admins.find((admin) => admin.id === id);
      const result = await patch(API_ENDPOINTS.UPDATEADMIN + `/${id}`, {
        name: admin.name,
        enabled: admin.enabled === 1 ? false : true,
      });
      if (result.status === 200) {
        showSnackbar(result.message, "success");
        await fetchItems();
      } else {
        showSnackbar(result.message, "error");
      }
    } catch (error) {
      console.error("Error disabling/enabling admin:", error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle title="Admins" />
        <CustomBreadCrumb
          paths={[
            {
              title: "Admins",
              icon: (
                <AdminPanelSettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              ),
            },
          ]}
        />
        <AddButton onClick={handleOpen} title="Add Admin" disabled={loading} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins?.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    {editMode === admin.id ? (
                      <TextField
                        value={admin.name}
                        onChange={(e) =>
                          handleEditChange(admin.id, e.target.value)
                        }
                        size="small"
                      />
                    ) : (
                      admin.name
                    )}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.created_at}</TableCell>
                  <TableCell>
                    {admin.enabled === 0 ? (
                      <Chip color="error" label="Disabled" />
                    ) : (
                      <Chip color="success" label="Active" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={admin.enabled === 0 ? "Enable" : "Disable"}>
                      <IconButton
                        color={admin.enabled === 0 ? "success" : "warning"}
                        sx={{ borderRadius: "50%" }}
                        onClick={() => disableEnableAdmin(admin.id)}
                      >
                        {admin.enabled === 0 ? <CheckIcon /> : <BlockIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        sx={{ borderRadius: "50%" }}
                        onClick={() => confirmDeleteModal(admin.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        sx={{ borderRadius: "50%" }}
                        onClick={() => {
                          if (editMode === admin.id) {
                            setEditMode(null);
                            handleUpdate(admin.id);
                          } else {
                            setEditMode(admin.id);
                          }
                        }}
                      >
                        {editMode === admin.id ? <CheckIcon /> : <EditIcon />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} mt={2} direction="row" justifyContent="center">
          <Pagination
            count={1}
            page={1}
            onChange={(e, page) => console.log("page", page)}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </Stack>
        <MyModal open={open} handleClose={handleClose}>
          <Typography variant="h6" gutterBottom>
            Add Admin
          </Typography>
          <EmailInput
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            validationPassed={setValidNewAdminEmail}
          />

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newAdminName}
            onChange={(e) => setNewAdminName(e.target.value)}
          />
          <PasswordInput
            value={newAdminPassword}
            minLength={6}
            onChange={(e) => setNewAdminPassword(e.target.value)}
            validationPassed={setValidNewAdminPassword}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={handleAdd}
              variant="contained"
              color="primary"
              disabled={!validNewAdminEmail || !validNewAdminPassword}
            >
              Save
            </LoadingButton>
          </Box>
        </MyModal>

        <MyModal
          open={confirmDelete.open}
          handleClose={() => setConfirmDelete({ open: false, id: null })}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography>Are you sure you want to delete this admin?</Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={() => setConfirmDelete({ open: false, id: null })}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={deleteAdmin} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </MyModal>
      </Box>
    </>
  );
};

export default AdminsScreen;
