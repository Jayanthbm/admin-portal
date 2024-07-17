// src/pages/SpecialtiesScreen.js

import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import SpecialityCard from '../components/Card/SpecialityCard';
import CustomLink from '../components/CustomLink';
import CustomTable from '../components/CustomTable';
import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import DeleteModal from '../components/Modal/DeleteModal';
import NewAdditonModal from '../components/Modal/NewAdditonModal';
import { API_ENDPOINTS, PATHS } from '../constants';
import AuthContext from '../context/auth.context';
import { useSnackbar } from '../context/snackbar.context';
import ViewContext from '../context/view.context';
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from '../helpers/api.handler';
import useAuthNavigation from '../hooks/useAuthNavigation';
const SpecialtiesScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { view } = useContext(ViewContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.SPECIALTIES);
  const showSnackbar = useSnackbar();

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [item, setItem] = useState({
    name: '',
  });
  const [editedItem, setEditedItem] = useState({});

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.ALLSPECIALTIES,
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
      url: API_ENDPOINTS.SPECIALTY,
      data: { name: item.name },
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

  const handleUpdate = async () => {
    return await updateItem({
      url: `${API_ENDPOINTS.SPECIALTY}/${editedItem.id}`,
      data: { name: editedItem.name },
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
        handleClose();
      },
      commonFunction: () => {},
    });
  };

  const confirmDeleteModal = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const handleDelete = async () => {
    return await deleteItem({
      url: `${API_ENDPOINTS.SPECIALTY}/${confirmDelete.id}`,
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

  const toSubSpecialityScreen = (item) => {
    return navigate(PATHS.SPECIALTIES + `/${item.id}`, {
      state: item,
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle
          title="Specialties"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              title: 'Specialties',
              icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          data={data}
          noPageTitle={'No Specialties Found'}
          noPageButtonTitle={'Add Speciality'}
          noPageButton={() => handleOpen()}
          showSkeleton={true}
          showViewSetting={true}
          addButton={handleOpen}
          addButtonTitle={'Add Speciality'}
          addButtonDisabled={loading}
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
                heading={['Name', 'Total Sub Specialties', 'Actions']}
              >
                {data?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <CustomLink
                        title={item.name}
                        onClick={() => toSubSpecialityScreen(item)}
                      />
                    </TableCell>
                    <TableCell>{item.totalSubspecialties}</TableCell>
                    <TableCell>
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
              <>
                {data?.map((item, index) => (
                  <SpecialityCard
                    key={index}
                    title={item.name}
                    onEdit={() => {
                      handleEditOpen(item);
                    }}
                    onDelete={() => confirmDeleteModal(item.id)}
                    onNavigate={() => toSubSpecialityScreen(item)}
                    value={item.totalSubspecialties}
                  />
                ))}
              </>
            )}
          </Box>
        </MyPageLayout>
      </Box>
      <NewAdditonModal
        open={open}
        handleClose={handleClose}
        title={editMode ? 'Edit Speciality' : 'Add Speciality'}
        subTitle={'Fill specialty details'}
        okButtonText={editMode ? 'Update' : 'Add'}
        onOk={editMode ? handleUpdate : handleAdd}
        onCancel={handleClose}
        isLoading={loading}
        okButtondisabled={
          editMode
            ? editedItem.name === '' || editedItem.name === null
            : item.name === '' || item.name === null
        }
      >
        <TextField
          label="Speciality Name"
          fullWidth
          margin="normal"
          value={editMode ? editedItem.name : item.name}
          onChange={(e) => {
            if (editMode) {
              setEditedItem({
                ...editedItem,
                name: e.target.value,
              });
            } else {
              setItem({
                ...item,
                name: e.target.value,
              });
            }
          }}
        />
      </NewAdditonModal>
      <DeleteModal
        open={confirmDelete.open}
        handleClose={() => setConfirmDelete({ open: false, id: null })}
        subTitle="Are you sure you want to delete this specialty? This will also delete all its sub specialties."
        onOk={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        isLoading={loading}
      />
    </>
  );
};

export default SpecialtiesScreen;
