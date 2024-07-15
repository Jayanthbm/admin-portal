import AcUnitIcon from "@mui/icons-material/AcUnit";
import CategoryIcon from "@mui/icons-material/Category";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomCard from "../components/Card/CustomCard";
import CustomTable from "../components/CustomTable";
import CustomBreadCrumb from "../components/Layout/CustomBreadCrumb";
import MyPageLayout from "../components/Layout/MyPageLayout";
import PageTitle from "../components/Layout/PageTitle";
import MyModal from "../components/Modal/MyModal";
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

const SubSpecialityScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const { view } = useContext(ViewContext);
  const location = useLocation();
  const state = location.state;
  useAuthNavigation(isLoggedIn, PATHS.SPECIALITIES + "/" + id, state);

  const showSnackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [data, setData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [name, setName] = useState("");

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

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(null);
    setName("");
    setConfirmDelete({ open: false, id: null });
  };

  const handleAdd = async () => {
    return await addItem({
      url: `${API_ENDPOINTS.SPECIALITY}/${id}/subspecialty`,
      data: { name: name },
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
      data.map((item) => (item.id === id ? { ...item, name: name } : item))
    );
  };

  const handleUpdate = async (spid, title) => {
    return await updateItem({
      url: `${API_ENDPOINTS.SPECIALITY}/${id}/subspecialty/${spid}`,
      data: { name: title },
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
              title: "Specialities",
              icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
            {
              title: state?.name || "Sub Specialities",
              icon: <></>,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          data={data}
          noPageTitle={"No Sub Specialities Found"}
          noPageButtonTitle={"Add Sub Speciality"}
          noPageButton={() => handleOpen()}
          showViewSetting={true}
          addButton={handleOpen}
          addButtonTitle={"Add Sub Speciality"}
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
              <CustomTable heading={["Name", "Actions"]}>
                {data?.map((item, index) => (
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
                        <> {item.name}</>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          sx={{ borderRadius: "50%" }}
                          onClick={() => {
                            if (editMode === item.id) {
                              setEditMode(null);
                              handleUpdate(item.id, item.name);
                            } else {
                              setEditMode(item.id);
                            }
                          }}
                        >
                          {editMode === item.id ? <CheckIcon /> : <EditIcon />}
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
                    </TableCell>
                  </TableRow>
                ))}
              </CustomTable>
            ) : (
              <Grid container spacing={3}>
                {data?.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CustomCard
                      title={item.name}
                      editble={editMode === item.id}
                      onEditChange={(name) => handleEditChange(item.id, name)}
                      icon={
                        <AcUnitIcon
                          color="primary"
                          fontSize="large"
                          sx={{ fontSize: 60 }}
                        />
                      }
                      detailsText="More"
                      isLoading={loading}
                      actions={[
                        {
                          title: "Edit",
                          icon:
                            editMode === item.id ? (
                              <CheckIcon />
                            ) : (
                              <EditIcon
                                color={loading ? "disabled" : "primary"}
                              />
                            ),
                          onClick: () => {
                            if (editMode === item.id) {
                              setEditMode(null);
                              handleUpdate(item.id, item.name);
                            } else {
                              setEditMode(item.id);
                            }
                          },
                          disabled: loading,
                        },

                        {
                          title: "Delete",
                          icon: (
                            <DeleteIcon
                              color={loading ? "disabled" : "error"}
                            />
                          ),
                          onClick: () => confirmDeleteModal(item.id),
                          disabled: loading,
                        },
                      ]}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </MyPageLayout>
      </Box>
      <MyModal
        open={open}
        handleClose={handleClose}
        title={"Add Sub Speciality"}
        subTitle={"Fill the details"}
        okButtonText="Add Sub Speciality"
        cancelButtonText="Cancel"
        onOk={handleAdd}
        onCancel={handleClose}
        isLoading={loading}
        okButtonIcon={<SaveIcon />}
        okButtondisabled={!name || loading}
      >
        <TextField
          label="Sub Speciality Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </MyModal>
      <MyModal
        open={confirmDelete.open}
        handleClose={() => setConfirmDelete({ open: false, id: null })}
        title="Confirm Deletion"
        subTitle="Are you sure you want to delete this sub speciality?"
        okButtonText="Delete"
        cancelButtonText="Cancel"
        onOk={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, id: null })}
        isLoading={loading}
        okButtonColor="error"
      />
    </>
  );
};

export default SubSpecialityScreen;
