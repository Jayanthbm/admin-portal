// src/pages/DoctorsScreen.js

import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DoctorCard from '../components/Card/DoctorCard';
import CustomLink from '../components/CustomLink';
import CustomTable from '../components/CustomTable';
import DoctorForm from '../components/Forms/DoctorForm';
import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import DeleteModal from '../components/Modal/DeleteModal';
import NewAdditonModal from '../components/Modal/NewAdditonModal';
import { API_ENDPOINTS, PATHS } from '../constants';
import { DOCTOR_SCREEN_CONTENT } from '../content';
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
const DoctorsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { view } = useContext(ViewContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.DOCTORS);
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const state = location.state;
  const reload = state?.reload || false;
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [item, setItem] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    medical_registration_number: '',
    specialty_id: null,
  });

  const [editedItem, setEditedItem] = useState({});
  const [doctorValid, setDoctorValid] = useState(false);

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.DOCTORS,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setData,
      commonFunction: () => {},
      force: force,
    });
  }, []);

  useEffect(() => {
    fetchItems(reload);
  }, [fetchItems, reload]);

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
      url: API_ENDPOINTS.DOCTOR,
      data: item,
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
      url: `${API_ENDPOINTS.DOCTOR}/${editedItem.id}`,
      data: editedItem,
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
      url: `${API_ENDPOINTS.DOCTOR}/${confirmDelete.id}`,
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
  const toDoctorScreen = (id, name) => {
    return navigate(PATHS.DOCTORS + `/${id}`, {
      state: {
        name: name,
      },
    });
  };

  const handleToggleStatus = async (doctor) => {
    const enabled = doctor.enabled === 0 ? true : false;

    return await updateItem({
      url: `${API_ENDPOINTS.DOCTOR}/${doctor.id}`,
      data: {
        name: doctor.name,
        enabled: enabled,
        customMessage: enabled === true ? 'Doctor Enabled' : 'Doctor Disabled',
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
          title="Doctors"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              title: 'Doctors',
              icon: <LocalHospitalIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          noPageButtonTitle="Add Doctor"
          noPageTitle="No Doctors"
          noPageButton={() => handleOpen()}
          data={data}
          showSkeleton={true}
          showViewSetting={true}
          addButton={handleOpen}
          addButtonTitle={'Add Doctor'}
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
                heading={[
                  'Id',
                  'Name',
                  'Email',
                  'Speciality',
                  'Created At',
                  'Reg No',
                  'Doctor ID',
                  'Status',
                  'Actions',
                ]}
              >
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <CustomLink
                        title={item.id}
                        onClick={() => toDoctorScreen(item.id, item.name)}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomLink
                        title={item.name}
                        onClick={() => toDoctorScreen(item.id, item.name)}
                      />
                    </TableCell>

                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <CustomLink
                        title={item.specialty}
                        onClick={() =>
                          navigate(
                            PATHS.SPECIALTIES + `/${item.specialty_id}`,
                            {
                              state: {
                                name: item.specialty,
                              },
                            }
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>{item.medical_registration_number}</TableCell>
                    <TableCell>{item.unique_id}</TableCell>
                    <TableCell>
                      {item.enabled === 1 ? (
                        <Chip color="success" label="Yes" />
                      ) : (
                        <Chip color="error" label="No" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={item.enabled === 0 ? 'Enable' : 'Disable'}
                      >
                        <IconButton
                          onClick={() => handleToggleStatus(item)}
                          sx={{ pb: 1, pt: 1 }}
                        >
                          {item.enabled === 0 ? (
                            <CheckIcon color="success" />
                          ) : (
                            <BlockIcon color="warning" />
                          )}
                        </IconButton>
                      </Tooltip>
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
                <DoctorCard
                  key={index}
                  doctor={item}
                  onEdit={handleEditOpen}
                  onDelete={confirmDeleteModal}
                  onToggleStatus={handleToggleStatus}
                  onNavigate={() => toDoctorScreen(item.id, item.name)}
                />
              ))
            )}
          </Box>
        </MyPageLayout>
      </Box>
      <NewAdditonModal
        open={open}
        handleClose={handleClose}
        title={editMode ? 'Edit Doctor' : 'Add Doctor'}
        subTitle={'Fill Doctor details'}
        okButtonText={editMode ? 'Update' : 'Add'}
        onOk={editMode ? handleUpdate : handleAdd}
        onCancel={handleClose}
        isLoading={loading}
        okButtondisabled={doctorValid && !loading ? false : true}
      >
        {editMode ? (
          <DoctorForm
            mode={editMode ? 'edit' : 'add'}
            item={editedItem}
            setItem={setEditedItem}
            isValid={setDoctorValid}
          />
        ) : (
          <DoctorForm
            mode={editMode ? 'edit' : 'add'}
            item={item}
            setItem={setItem}
            isValid={setDoctorValid}
          />
        )}
      </NewAdditonModal>
      <DeleteModal
        open={confirmDelete.open}
        handleClose={() => setConfirmDelete({ open: false, id: null })}
        subTitle={DOCTOR_SCREEN_CONTENT.DELETE}
        onOk={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        isLoading={loading}
      />
    </>
  );
};

export default DoctorsScreen;
