// src/pages/SubSpecialityScreen.js

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
import { useLocation, useParams } from 'react-router-dom';

import SpecialityCard from '../components/Card/SpecialityCard';
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

const SubSpecialityScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const { view } = useContext(ViewContext);
  const showSnackbar = useSnackbar();

  const location = useLocation();
  const state = location.state;
  useAuthNavigation(isLoggedIn, PATHS.SPECIALITIES + '/' + id, state);

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [item, setItem] = useState({
    name: '',
  });
  const [editedItem, setEditedItem] = useState({});

  const fetchItems = useCallback(
    async (force) => {
      await getItems({
        url: `${API_ENDPOINTS.ALLSPECIALITIES}/${id}`,
        loadingFunction: setLoading,
        snackBarFunction: null,
        dataSetterState: setData,
        commonFunction: () => {},
        force: force,
      });
    },
    [id]
  );

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
      url: `${API_ENDPOINTS.SPECIALITY}/${id}/subspecialty`,
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
      url: `${API_ENDPOINTS.SPECIALITY}/${id}/subspecialty/${editedItem.id}`,
      data: { name: editedItem.name },
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

  const confirmDeleteModal = (id) => {
    setConfirmDelete({ open: true, id });
  };

  const handleDelete = async () => {
    return await deleteItem({
      url: `${API_ENDPOINTS.SPECIALITY}/${id}/subspecialty/${confirmDelete.id}`,
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
          title="Sub Specialities"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              navigation: PATHS.SPECIALITIES,
              title: 'Specialities',
              icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
            {
              title: state?.name || 'Sub Specialities',
              icon: <></>,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          data={data}
          noPageTitle={'No Sub Specialities Found'}
          noPageButtonTitle={'Add Sub Speciality'}
          noPageButton={() => handleOpen()}
          showSkeleton={true}
          showViewSetting={true}
          addButton={handleOpen}
          addButtonTitle={'Add Sub Speciality'}
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
              <CustomTable heading={['Name', 'Actions']}>
                {data?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{item.name}</TableCell>
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
                    onEdit={() => {
                      handleEditOpen(item);
                    }}
                    onDelete={() => confirmDeleteModal(item.id)}
                    onNavigate={() => {}}
                    value={0}
                    valueTitle={item.name}
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
        title={editMode ? 'Edit Sub Speciality' : 'Add Sub Speciality'}
        subTitle={'Fill speciality details'}
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
          label="Sub Speciality Name"
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
        subTitle="Are you sure you want to delete this sub speciality?"
        onOk={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        isLoading={loading}
      />
    </>
  );
};

export default SubSpecialityScreen;
