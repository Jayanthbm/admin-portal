// src/pages/AdminsScreen.js

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import AdminCard from '../components/Card/AdminCard';
import CustomTable from '../components/CustomTable';
import EmailInput from '../components/Input/EmailInput';
import PasswordInput from '../components/Input/PasswordInput';
import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import DeleteModal from '../components/Modal/DeleteModal';
import NewAdditonModal from '../components/Modal/NewAdditonModal';
import { API_ENDPOINTS } from '../constants';
import { useSnackbar } from '../context/snackbar.context';
import ViewContext from '../context/view.context';
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from '../helpers/api.handler';
const AdminsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { view } = useContext(ViewContext);
  const showSnackbar = useSnackbar();

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [item, setItem] = useState({
    email: '',
    password: '',
  });
  const [validNewAdminEmail, setValidNewAdminEmail] = useState(false);
  const [validNewAdminPassword, setValidNewAdminPassword] = useState(false);
  const [editedItem, setEditedItem] = useState({});

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

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
  };

  const handleEditOpen = (item) => {
    setEditedItem(item);
    setEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setConfirmDelete({ open: false, id: null });
    setItem({});
    setEditedItem({});
  };

  const handleAdd = async () => {
    return await addItem({
      url: API_ENDPOINTS.ADDADMIN,
      data: item,
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
        handleClose();
      },
      commonFunction: () => {},
    });
  };

  const handleUpdate = async () => {
    editedItem.enabled = editedItem.enabled === 1 ? true : false;
    return await updateItem({
      url: `${API_ENDPOINTS.UPDATEADMIN}/${editedItem.id}`,
      data: editedItem,
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
    return await deleteItem({
      url: `${API_ENDPOINTS.DELETEADMIN}/${confirmDelete.id}`,
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

  const handleToggleStatus = async (item) => {
    const enabled = item.enabled === 0 ? true : false;

    return await updateItem({
      url: `${API_ENDPOINTS.UPDATEADMIN}/${item.id}`,
      data: {
        name: item.name,
        enabled: enabled,
        customMessage: enabled === true ? 'Admin Enabled' : 'Admin Disabled',
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
              title: 'Admins',
              icon: (
                <AdminPanelSettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              ),
            },
          ]}
        />

        <MyPageLayout
          isLoading={loading}
          noPageButtonTitle="Add Admin"
          noPageTitle="No Admins"
          noPageButton={handleOpen}
          data={data}
          showSkeleton={true}
          showViewSetting={true}
          addButton={handleOpen}
          addButtonTitle={'Add Admin'}
          addButtonDisabled={loading}
          showViewSettings={false}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {view === 'table' ? (
              <CustomTable
                heading={['Name', 'Email', 'Created At', 'Status', 'Actions']}
              >
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{item.name}</TableCell>
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
                      <IconButton
                        onClick={() => handleToggleStatus(item)}
                        sx={{ pb: 1, pt: 1 }}
                      >
                        <Tooltip
                          title={item.enabled === 0 ? 'Enable' : 'Disable'}
                        >
                          {item.enabled === 0 ? (
                            <CheckIcon color="success" />
                          ) : (
                            <BlockIcon color="warning" />
                          )}
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleEditOpen(item);
                        }}
                        sx={{ pb: 1, pt: 1 }}
                      >
                        <Tooltip title="Edit">
                          <EditIcon color="primary" />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        onClick={() => confirmDeleteModal(item.id)}
                        sx={{ pb: 1, pt: 1 }}
                      >
                        <Tooltip title="Delete">
                          <DeleteIcon color="error" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </CustomTable>
            ) : (
              data.map((item, index) => (
                <AdminCard
                  key={index}
                  onEdit={handleEditOpen}
                  onDelete={confirmDeleteModal}
                  onToggleStatus={handleToggleStatus}
                  item={item}
                />
              ))
            )}
          </Box>
        </MyPageLayout>

        <NewAdditonModal
          open={open}
          handleClose={handleClose}
          title={editMode ? 'Edit Admin' : 'Add Admin'}
          subTitle={'Fill Admin details'}
          okButtonText={editMode ? 'Update' : 'Add'}
          onOk={editMode ? handleUpdate : handleAdd}
          onCancel={handleClose}
          isLoading={loading}
          okButtondisabled={
            editMode
              ? editedItem?.name?.length < 1
              : !validNewAdminEmail || !validNewAdminPassword
          }
        >
          {editMode ? (
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editedItem.name}
              onChange={(e) => {
                setEditedItem({
                  ...editedItem,
                  name: e.target.value,
                });
              }}
            />
          ) : (
            <Box component="form">
              <EmailInput
                value={item.email}
                onChange={(e) =>
                  setItem({
                    ...item,
                    email: e.target.value,
                  })
                }
                setValidationState={setValidNewAdminEmail}
                autoComplete="email"
              />

              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={item.name}
                onChange={(e) => {
                  setItem({
                    ...item,
                    name: e.target.value,
                  });
                }}
              />
              <PasswordInput
                value={item.password}
                minLength={6}
                onChange={(e) => {
                  setItem({
                    ...item,
                    password: e.target.value,
                  });
                }}
                setValidationState={setValidNewAdminPassword}
                autoComplete={'new-password'}
              />
            </Box>
          )}
        </NewAdditonModal>

        <DeleteModal
          open={confirmDelete.open}
          handleClose={() => setConfirmDelete({ open: false, id: null })}
          subTitle="Are you sure you want to delete this admin?"
          onOk={handleDelete}
          onCancel={() => setConfirmDelete({ open: false, id: null })}
          isLoading={loading}
        />
      </Box>
    </>
  );
};

export default AdminsScreen;
