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
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import SpecialityCard from '../components/Card/SpecialityCard';
import CustomLink from '../components/CustomLink';
import CustomTable from '../components/CustomTable';
import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import DeleteModal from '../components/Modal/DeleteModal';
import NewAdditonModal from '../components/Modal/NewAdditonModal';
import { API_ENDPOINTS, PATHS } from '../constants';
import { useSnackbar } from '../context/snackbar.context';
import ViewContext from '../context/view.context';
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from '../helpers/api.handler';

const SubSpecialtyScreen = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { view } = useContext(ViewContext);
  const showSnackbar = useSnackbar();

  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

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
        url: `${API_ENDPOINTS.ALLSPECIALTIES}/${id}`,
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
      url: `${API_ENDPOINTS.SPECIALTY}/${id}/subspecialty`,
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
      url: `${API_ENDPOINTS.SPECIALTY}/${id}/subspecialty/${editedItem.id}`,
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
      url: `${API_ENDPOINTS.SPECIALTY}/${id}/subspecialty/${confirmDelete.id}`,
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

  const toUserRecordConfig = (item) => {
    return navigate(PATHS.USER_RECORD_CONFIG, {
      state: {
        subSpecialtyId: item.id,
      },
    });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageTitle
          title="Sub Specialties"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              navigation: PATHS.SPECIALTIES,
              title: 'Specialties',
              icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
            {
              title: state?.name || 'Sub Specialties',
              icon: <></>,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          data={data}
          noPageTitle={'No Sub Specialties Found'}
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
                    <TableCell>
                      <CustomLink
                        title={item.name}
                        onClick={() => toUserRecordConfig(item)}
                      />
                    </TableCell>
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
                    onNavigate={() => toUserRecordConfig(item)}
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
        subTitle={'Fill Specialty details'}
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
        subTitle="Are you sure you want to delete this Sub Specialty?"
        onOk={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        isLoading={loading}
      />
    </>
  );
};

export default SubSpecialtyScreen;
