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
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";

import CustomTable from "../components/CustomTable";
import EmailInput from "../components/Input/EmailInput";
import CustomBreadCrumb from "../components/Layout/CustomBreadCrumb";
import MyModal from "../components/Modal/MyModal";

import MyPageLayout from "../components/Layout/MyPageLayout";
import PageTitle from "../components/Layout/PageTitle";
import PasswordInput from "../components/Input/PasswordInput";
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
  useAuthNavigation(isLoggedIn, PATHS.ADMINS);
  const showSnackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [data, setData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [validNewAdminEmail, setValidNewAdminEmail] = useState(false);
  const [validNewAdminPassword, setValidNewAdminPassword] = useState(false);

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.ALLADMINS,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setData,
      commonFunction: () => {},
      force: force,
    });
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
      reloadData: () => {
        fetchItems(true);
      },
      commonFunction: () => {
        handleClose();
      },
    });
  };

  const handleEditChange = (id, name) => {
    setData(
      data.map((admin) => (admin.id === id ? { ...admin, name } : admin))
    );
  };

  const handleUpdate = async (id, enabled) => {
    const item = getItemById(data, id);
    if (typeof enabled !== "boolean") {
      enabled = enabled === 1 ? true : false;
    }
    return updateItem({
      url: `${API_ENDPOINTS.UPDATEADMIN}/${item.id}`,
      data: {
        name: item.name,
        enabled: enabled,
      },
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
      },
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
      url: `${API_ENDPOINTS.DELETEADMIN}/${id}`,
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
      },
      commonFunction: () => {
        setConfirmDelete({ open: false, id: null });
      },
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle
          title="Admins"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
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

        <MyPageLayout
          isLoading={loading}
          noPageButtonTitle="Add Admin"
          noPageButton={handleOpen}
          noPageTitle="No Admins"
          data={data}
          showSkeleton={true}
          addButton={handleOpen}
          addButtonTitle={"Add Admin"}
          addButtonDisabled={loading}
          showViewSettings={false}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <CustomTable
              heading={["Name", "Email", "Created At", "Status", "Actions"]}
            >
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {editMode === item.id ? (
                      <TextField
                        value={item.name}
                        onChange={(e) =>
                          handleEditChange(item.id, e.target.value)
                        }
                        size="small"
                      />
                    ) : (
                      item.name
                    )}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>
                    {item.enabled === 0 ? (
                      <Chip color="error" label="Disabled" />
                    ) : (
                      <Chip color="success" label="Active" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={item.enabled === 0 ? "Enable" : "Disable"}>
                      <IconButton
                        color={item.enabled === 0 ? "success" : "warning"}
                        sx={{ borderRadius: "50%" }}
                        onClick={() => handleUpdate(item.id, !item.enabled)}
                      >
                        {item.enabled === 0 ? <CheckIcon /> : <BlockIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        sx={{ borderRadius: "50%" }}
                        onClick={() => confirmDeleteModal(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        sx={{ borderRadius: "50%" }}
                        onClick={() => {
                          if (editMode === item.id) {
                            setEditMode(null);
                            handleUpdate(item.id, item.enabled);
                          } else {
                            setEditMode(item.id);
                          }
                        }}
                      >
                        {editMode === item.id ? <CheckIcon /> : <EditIcon />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </CustomTable>
          </Box>
        </MyPageLayout>

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
