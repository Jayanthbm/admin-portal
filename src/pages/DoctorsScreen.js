// src/pages/DoctorsScreen.js
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomLink from "../components/CustomLink";
import CustomTable from "../components/CustomTable";
import CustomBreadCrumb from "../components/Layout/CustomBreadCrumb";

import MyPageLayout from "../components/Layout/MyPageLayout";
import PageTitle from "../components/Layout/PageTitle";
import DeleteModal from "../components/Modal/DeleteModal";
import NewAdditonModal from "../components/Modal/NewAdditonModal";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import { useSnackbar } from "../context/snackbar.context";
import ViewContext from "../context/view.context";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../helpers/api.handler";
import useAuthNavigation from "../hooks/useAuthNavigation";
const DoctorsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { view } = useContext(ViewContext);
  const naviagate = useAuthNavigation(isLoggedIn, PATHS.DOCTORS);
  const showSnackbar = useSnackbar();
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [item, setItem] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    medical_registration_number: "",
    specialty_id: null,
  });

  const [editedItem, setEditedItem] = useState({});

  const [options, setOptions] = useState([]);

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

  const fetchOptions = useCallback(async () => {
    await getItems({
      url: API_ENDPOINTS.ALLSPECIALITIES,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setOptions,
      commonFunction: () => {},
      force: false,
    });
  }, []);

  useEffect(() => {
    fetchItems();
    fetchOptions();
  }, [fetchItems, fetchOptions]);

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
    setItem({
      email: "",
      password: "",
      name: "",
      phone: "",
      medical_registration_number: "",
      specialty_id: null,
    });
    setEditedItem({
      email: "",
      password: "",
      name: "",
      phone: "",
      medical_registration_number: "",
      specialty_id: null,
    });
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
    return naviagate(PATHS.DOCTORS + `/${id}`, {
      state: {
        name: name,
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
              title: "Doctors",
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
          addButtonTitle={"Add Doctor"}
          addButtonDisabled={loading}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {view === "table" ? (
              <CustomTable
                heading={[
                  "Id",
                  "Name",
                  "Email",
                  "Speciality",
                  "Created At",
                  "Status",
                  "Actions",
                ]}
              >
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                        title={item.speciality}
                        onClick={() =>
                          naviagate(
                            PATHS.SPECIALITIES + `/${item.speciality_id}`,
                            {
                              state: {
                                name: item.speciality,
                              },
                            }
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>
                      {item.status === 1 ? (
                        <Chip color="success" label="Yes" />
                      ) : (
                        <Chip color="error" label="No" />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => {}} sx={{ pb: 1, pt: 1 }}>
                        <Tooltip
                          title={item.status === 0 ? "Enable" : "Disable"}
                        >
                          {item.status === 0 ? (
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
              <> Card View</>
            )}
          </Box>
        </MyPageLayout>
      </Box>
      <NewAdditonModal
        open={open}
        handleClose={handleClose}
        title={editMode ? "Edit Doctor" : "Add Doctor"}
        subTitle={"Fill Doctor details"}
        okButtonText={editMode ? "Update" : "Add"}
        onOk={editMode ? handleUpdate : handleAdd}
        onCancel={handleClose}
        isLoading={loading}
        okButtondisabled={
          editMode
            ? editedItem?.name?.length > 0 &&
              editedItem?.password?.length > 6 &&
              editedItem?.specialty_id > 0 &&
              editedItem?.medical_registration_number?.length > 0 &&
              editedItem?.phone.length > 9 &&
              !loading
              ? false
              : true
            : item?.name?.length > 0 &&
              item?.password?.length > 0 &&
              item?.specialty_id > 0 &&
              item?.medical_registration_number?.length > 0 &&
              item?.phone?.length > 0 &&
              !loading
            ? false
            : true
        }
      >
        {editMode ? <>Edit View</> : <>Add View</>}
      </NewAdditonModal>
      <DeleteModal
        open={confirmDelete.open}
        handleClose={() => setConfirmDelete({ open: false, id: null })}
        subTitle="Are you sure you want to delete this doctor?"
        onOk={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        isLoading={loading}
      />
    </>
  );
};

export default DoctorsScreen;
