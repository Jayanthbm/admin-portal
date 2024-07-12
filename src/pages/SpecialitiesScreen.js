import AcUnitIcon from "@mui/icons-material/AcUnit";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Grid, Typography, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import CustomCard from "../components/CustomCard";
import PageTitle from "../components/PageTitle";
import { API_ENDPOINTS, PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
import { useSnackbar } from "../context/snackbar.context";
import MyModal from "../components/MyModal";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../helpers/api.handler";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const SpecialitiesScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useAuthNavigation(isLoggedIn, PATHS.SPECIALITIES);
  const showSnackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [specialities, setSpecialities] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [name, setName] = useState("");

  const fetchItems = async () => {
    return await getItems({
      url: API_ENDPOINTS.ALLSPECIALITIES,
      loadingFunction: setLoading,
      snackBarFunction: null,
      dataSetterState: setSpecialities,
      commonFunction: () => {},
    });
  };

  useEffect(() => {
    // Fetch initial data from API
    fetchItems();
    setSpecialities([
      {
        id: 1,
        title: "Speciality 1",
        totalSubSpecialities: 10,
      },
      {
        id: 2,
        title: "Speciality 2",
        totalSubSpecialities: 5,
      },
      {
        id: 3,
        title: "Speciality 3",
        totalSubSpecialities: 15,
      },
    ]);
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(null);
    setName("");
  };

  const handleAdd = async () => {
    return await addItem({
      url: API_ENDPOINTS.ADDSPECIALITY,
      data: { title: name },
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: fetchItems,
      commonFunction: () => {
        handleClose();
      },
    });
  };

  const handleEditChange = (id, name) => {
    setSpecialities(
      specialities.map((speciality) =>
        speciality.id === id ? { ...speciality, name } : speciality
      )
    );
  };

  const getItemById = (id) => {
    return specialities.find((speciality) => speciality.id === id);
  };

  const handleUpdate = async () => {
    const item = getItemById(editMode.id);
    return await updateItem({
      url: API_ENDPOINTS.UPDATESPECIALITY + `/${item.id}`,
      data: { title: name },
      loadingFunction: setLoading,
      snackBarFunction: showSnackbar,
      reloadData: fetchItems,
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
      url: API_ENDPOINTS.DELETESPECIALITY + `/${confirmDelete.id}`,
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
        <PageTitle title="Specialities" />
        <CustomBreadCrumb
          paths={[
            {
              title: "Specialities",
              icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
          ]}
        />
        <AddButton
          onClick={handleOpen}
          title="Add Speciality"
          disabled={loading}
        />
        <Grid container spacing={3}>
          {specialities?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomCard
                title={item.title}
                icon={
                  <AcUnitIcon
                    color="primary"
                    fontSize="large"
                    sx={{ fontSize: 60 }}
                  />
                }
                buttonClick={() =>
                  navigate(PATHS.SPECIALITIES + "/" + index, { state: item })
                }
                detailsText="More"
                value={item.totalSubSpecialities}
                isLoading={loading}
                valueToolTip="Total Sub Specialities"
                actions={[
                  {
                    title: "Edit",
                    icon: <EditIcon color={loading ? "disabled" : "primary"} />,
                    onClick: () => {
                      setEditMode(item);
                      handleOpen();
                    },
                    disabled: loading,
                  },
                  ,
                  {
                    title: "Delete",
                    icon: <DeleteIcon color={loading ? "disabled" : "error"} />,
                    onClick: () => confirmDeleteModal(item.id),
                    disabled: loading,
                  },
                ]}
                isCountUp={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <MyModal open={open} handleClose={handleClose}>
        <Typography variant="h6" gutterBottom>
          Add Speciality
        </Typography>
        <TextField
          label="Speciality Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          onClick={handleAdd}
          variant="contained"
          color="primary"
          disabled={!name || loading}
        >
          Save
        </LoadingButton>
      </MyModal>
    </>
  );
};

export default SpecialitiesScreen;
