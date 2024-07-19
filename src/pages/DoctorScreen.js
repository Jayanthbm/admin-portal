// src/pages/DoctorScreen.js
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import SingleDoctorCard from '../components/Card/SingleDoctorCard';
import CustomTable from '../components/CustomTable';
import DoctorSubscriptionForm from '../components/Forms/DoctorSubscriptionForm';
import CustomBreadCrumb from '../components/Layout/CustomBreadCrumb';
import MyPageLayout from '../components/Layout/MyPageLayout';
import PageTitle from '../components/Layout/PageTitle';
import DeleteModal from '../components/Modal/DeleteModal';
import NewAdditonModal from '../components/Modal/NewAdditonModal';
import { API_ENDPOINTS, PATHS } from '../constants';
import { DOCTOR_SCREEN_CONTENT } from '../content';
import { useSnackbar } from '../context/snackbar.context';
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from '../helpers/api.handler';
import { formatDate, getRemainingDays } from '../helpers/util.helper';

const DoctorScreen = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteDoctor, setConfirmDeleteDoctor] = useState({
    open: false,
    id: null,
  });

  const [confirmDeleteSubscription, setConfirmDeleteSubscription] = useState({
    open: false,
    id: null,
  });

  const [item, setItem] = useState({
    start_date: '',
    end_date: '',
    max_patients: null,
    allow_multiple_subspecialities: false,
    sub_specialities: [],
    price: null,
  });

  const [editedItem, setEditedItem] = useState({});
  const [subscriptionValid, setSubscriptionValid] = useState(false);

  const fetchItems = useCallback(
    async (force) => {
      await getItems({
        url: `${API_ENDPOINTS.DOCTOR}/${id}`,
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
    setConfirmDeleteSubscription({ open: false, id: null });
    setConfirmDeleteDoctor({ open: false, id: null });
    setItem({
      start_date: '',
      end_date: '',
      max_patients: null,
      allow_multiple_subspecialities: false,
      sub_specialities: [],
      price: null,
    });
    setEditedItem({});
  };

  const handleAdd = async () => {
    return await addItem({
      url: `${API_ENDPOINTS.DOCTOR}/${id}/subscription`,
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
      url: `${API_ENDPOINTS.DOCTOR}/${id}/subscription/${editedItem.id}`,
      data: editedItem,
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
        handleClose();
      },
      commonFunction: () => {},
    });
  };

  const confirmDeleteSubscriptionModal = (id) => {
    setConfirmDeleteSubscription({ open: true, id });
  };

  const confirmDeleteDoctorModal = (id) => {
    setConfirmDeleteDoctor({ open: true, id });
  };

  const handleDeleteDoctor = async () => {
    return await deleteItem({
      url: `${API_ENDPOINTS.DOCTOR}/${confirmDeleteDoctor.id}`,
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: () => {
        fetchItems(true);
      },
      commonFunction: () => {
        handleClose();
        navigate(PATHS.DOCTORS, {
          state: {
            reload: true,
          },
        });
      },
    });
  };

  const handleDelete = async () => {
    return await deleteItem({
      url: `${API_ENDPOINTS.DOCTOR}/${id}/subscription/${confirmDeleteSubscription.id}`,
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

  const handleToggleSubscriptionStatus = async (subscription) => {
    const enabled = subscription.enabled === 0 ? true : false;

    return await updateItem({
      url: `${API_ENDPOINTS.DOCTOR}/${id}/subscription/${subscription.id}`,
      data: {
        enabled: enabled,
        customMessage:
          enabled === true ? 'Subscription Enabled' : 'Subscription Disabled',
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
          title="Doctor Details"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              navigation: PATHS.DOCTORS,
              title: 'Doctors',
              icon: <LocalHospitalIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
            {
              title: state?.name || 'Doctor Details',
              icon: <></>,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          showSkeleton={true}
          showNoDataCard={false}
          showViewSetting={false}
        >
          <>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 5,
              }}
            >
              <Button
                variant="contained"
                color={data?.doctor?.enabled === 0 ? 'success' : 'warning'}
                sx={{ mr: 2 }}
                onClick={() => handleToggleStatus(data?.doctor)}
              >
                {data?.doctor?.enabled === 0 ? 'Enable' : 'Disable'}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  confirmDeleteDoctorModal(data?.doctor.id);
                }}
              >
                Delete
              </Button>
            </Grid>
            {data?.doctor && <SingleDoctorCard doctor={data?.doctor} />}
          </>
        </MyPageLayout>
        <MyPageLayout
          isLoading={loading}
          noPageButtonTitle={'Add Subscription'}
          noPageTitle={'No Subcriptions Assigned'}
          noPageButton={() => handleOpen()}
          data={data?.subscriptions}
          showSkeleton={true}
          showViewSetting={false}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Subscriptions</Typography>
            <Button variant="contained" onClick={handleOpen}>
              Add Subscription
            </Button>
          </Box>
          <CustomTable
            heading={[
              'Id',
              'Name',
              'Price',
              'Start Date',
              'End Date',
              'Remaing Days',
              'Max Patients',
              'Multiple Specialties',
              'Status',
              'Actions',
            ]}
          >
            {data?.subscriptions?.map((subscription) => (
              <TableRow
                key={subscription.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{subscription.id}</TableCell>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>₹{subscription.price}</TableCell>
                <TableCell>{formatDate(subscription.start_date)}</TableCell>
                <TableCell>{formatDate(subscription.end_date)}</TableCell>
                <TableCell>
                  {getRemainingDays(
                    subscription.start_date,
                    subscription.end_date
                  )}
                </TableCell>
                <TableCell>{subscription.max_patients}</TableCell>
                <TableCell>
                  {subscription.allow_multiple_subspecialities === 1 ? (
                    <Chip color="success" label="Allowed" />
                  ) : (
                    <Chip color="error" label="Not Allowed" />
                  )}
                </TableCell>
                <TableCell>
                  {subscription.enabled === 1 ? (
                    <Chip color="success" label="Enabled" />
                  ) : (
                    <Chip color="error" label="Disabled" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={subscription.enabled === 0 ? 'Enable' : 'Disable'}
                  >
                    <IconButton
                      onClick={() =>
                        handleToggleSubscriptionStatus(subscription)
                      }
                      sx={{ pb: 1, pt: 1 }}
                    >
                      {subscription.enabled === 0 ? (
                        <CheckIcon color="success" />
                      ) : (
                        <BlockIcon color="warning" />
                      )}
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={() => handleEditOpen(subscription)}>
                    <Tooltip title="Edit">
                      <EditIcon color="primary" />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      confirmDeleteSubscriptionModal(subscription.id);
                    }}
                  >
                    <Tooltip title="Delete">
                      <DeleteIcon color="error" />
                    </Tooltip>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </CustomTable>
        </MyPageLayout>
      </Box>

      <NewAdditonModal
        open={open}
        handleClose={handleClose}
        title={editMode ? 'Edit Subscription' : 'Add Subscription'}
        subTitle={'Fill subscription details'}
        okButtonText={editMode ? 'Update' : 'Add'}
        onOk={editMode ? handleUpdate : handleAdd}
        onCancel={handleClose}
        isLoading={loading}
        okButtondisabled={subscriptionValid && !loading ? false : true}
      >
        <DoctorSubscriptionForm
          mode={editMode ? 'edit' : 'add'}
          item={
            editMode
              ? data?.subscriptions?.find((item) => item.id === editedItem.id)
              : item
          }
          editedItem={editedItem}
          setItem={setItem}
          setEditedItem={setEditedItem}
          isValid={setSubscriptionValid}
          specialty_id={data?.doctor?.specialty_id}
        />
      </NewAdditonModal>
      <DeleteModal
        open={confirmDeleteDoctor.open}
        handleClose={() => setConfirmDeleteDoctor({ open: false, id: null })}
        subTitle={DOCTOR_SCREEN_CONTENT.DELETE}
        onOk={handleDeleteDoctor}
        onCancel={() => setConfirmDeleteDoctor({ open: false, id: null })}
        isLoading={loading}
      />
      <DeleteModal
        open={confirmDeleteSubscription.open}
        handleClose={() =>
          setConfirmDeleteSubscription({ open: false, id: null })
        }
        subTitle="Are you sure you want to delete the Subscription?"
        onOk={handleDelete}
        onCancel={() => setConfirmDeleteSubscription({ open: false, id: null })}
        isLoading={loading}
      />
    </>
  );
};

export default DoctorScreen;
