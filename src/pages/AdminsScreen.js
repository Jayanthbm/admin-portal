// src/pages/AdminsScreen.js

import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import PageTitle from "../components/PageTitle";
import PasswordInput from "../components/PasswordInput";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PageLoader from "../components/PageLoader";
import { useSnackbar } from "../context/snackbar.context";
const AdminsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.ADMINS);
  const showSnackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [newAdmin, setNewAdmin] = useState({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    // Fetch initial data from API
    const fetchAdmins = async () => {
      try {
        // Replace with actual API call
        const response = await fetch("/api/admins");
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(null);
    setNewAdmin({
      email: "",
      name: "",
      password: "",
    });
  };

  const handleAddAdmin = async () => {
    // Validate email and password
    if (!newAdmin.email || !newAdmin.password) {
      showSnackbar("Email and password are required.", "error");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAdmin.email)) {
      showSnackbar("Invalid email format.", "error");
      return;
    }

    try {
      // Placeholder for API call to add admin
      // await api.addAdmin(newAdmin);
      const id = admins.length + 1;
      setAdmins([
        ...admins,
        {
          ...newAdmin,
          id,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          disabled: false,
        },
      ]);
      setNewAdmin({ email: "", name: "", password: "" });
      handleClose();
      showSnackbar("Admin added successfully!", "success");
    } catch (error) {
      console.error("Error adding admin:", error);
      showSnackbar("Failed to add admin.", "error");
    }
  };

  const handleEditChange = (id, name) => {
    setAdmins(
      admins.map((admin) => (admin.id === id ? { ...admin, name } : admin))
    );
  };

  const updateAdmin = async (id) => {
    try {
      // Placeholder for API call to update admin
      // await api.updateAdmin(id, { name: admins.find(admin => admin.id === id).name });
      setEditMode(null);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const confirmDeleteAdmin = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const deleteAdmin = async () => {
    const { id } = confirmDelete;
    setConfirmDelete({ open: false, id: null });
    try {
      // Placeholder for API call to delete admin
      // await api.deleteAdmin(id);
      setAdmins(admins.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const disableEnableAdmin = async (id) => {
    try {
      // Placeholder for API call to disable/enable admin
      // await api.disableEnableAdmin(id);
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, disabled: !admin.disabled } : admin
        )
      );
    } catch (error) {
      console.error("Error disabling/enabling admin:", error);
    }
  };

  return (
    <>
      <PageLoader loading={loading} />
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
        <AddButton onClick={handleOpen} title="Add Admin" />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
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
                  <TableCell>{admin.createdAt}</TableCell>
                  <TableCell>{admin.lastLogin}</TableCell>
                  <TableCell>
                    {admin.disabled ? (
                      <Chip color="error" label="Disabled" />
                    ) : (
                      <Chip color="success" label="Active" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={admin.disabled ? "Enable" : "Disable"}>
                      <IconButton
                        color={admin.disabled ? "success" : "warning"}
                        sx={{ borderRadius: "50%" }}
                        onClick={() => disableEnableAdmin(admin.id)}
                      >
                        {admin.disabled ? <CheckIcon /> : <BlockIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        sx={{ borderRadius: "50%" }}
                        onClick={() => confirmDeleteAdmin(admin.id)}
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
                            updateAdmin(admin.id);
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
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
          />

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <PasswordInput
            value={newAdmin.password}
            minLength={8}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value })
            }
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <Button
              onClick={handleAddAdmin}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
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
