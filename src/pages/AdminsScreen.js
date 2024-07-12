// src/pages/AdminsScreen.js

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import EmailInput from "../components/EmailInput";
import MyModal from "../components/MyModal";
import PageTitle from "../components/PageTitle";
import PasswordInput from "../components/PasswordInput";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { useSnackbar } from "../context/snackbar.context";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../helpers/api.handler";
import { getItemById } from "../helpers/util.helper";
import useAuthNavigation from "../hooks/useAuthNavigation";
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

  const handleUpdate = async (id, enabled) => {
    const item = getItemById(admins, id);
    if(typeof enabled !== "boolean"){
      enabled = enabled === 1 ? true : false
    }
    return await updateItem({
      url: API_ENDPOINTS.UPDATEADMIN + `/${item.id}`,
      data: {
        name: item.name,
        enabled: enabled,
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

  const handleDelete = async () => {
    const { id } = confirmDelete;
    return await deleteItem({
      url: API_ENDPOINTS.DELETEADMIN + `/${id}`,
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: fetchItems,
      commonFunction: () => {
        setConfirmDelete({ open: false, id: null });
      },
    });
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
                        onClick={() => handleUpdate(admin.id, !admin.enabled)}
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
                            handleUpdate(admin.id, admin.enabled);
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
        <MyModal
          open={open}
          handleClose={handleClose}
          title="Add Admin"
          subTitle={"Enter admin details"}
          okButtonText="Add Admin"
          cancelButtonText="Cancel"
          onOk={handleAdd}
          onCancel={handleClose}
          isLoading={loading}
          okButtonIcon={<SaveIcon />}
          okButtondisabled={!validNewAdminEmail || !validNewAdminPassword}
        >
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
        </MyModal>

        <MyModal
          open={confirmDelete.open}
          handleClose={() => setConfirmDelete({ open: false, id: null })}
          title="Confirm Deletion"
          subTitle="Are you sure you want to delete this admin?"
          okButtonText="Delete"
          cancelButtonText="Cancel"
          onOk={handleDelete}
          onCancel={() => setConfirmDelete({ open: false, id: null })}
          isLoading={loading}
          okButtonColor="error"
        />
      </Box>
    </>
  );
};

export default AdminsScreen;
