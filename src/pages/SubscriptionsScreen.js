import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import SubscriptionForm from "../components/Forms/SubscriptionForm";
import CustomBreadCrumb from "../components/Layout/CustomBreadCrumb";
import MyPageLayout from "../components/Layout/MyPageLayout";
import PageTitle from "../components/Layout/PageTitle";
import MyModal from "../components/Modal/MyModal";
import SubscriptionCard from "../components/Card/SubscriptionCard";
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

const SubscriptionsScreen = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { view } = useContext(ViewContext);
  useAuthNavigation(isLoggedIn, PATHS.SUBSCRIPTIONS);
  const showSnackbar = useSnackbar();
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const [item, setItem] = useState({
    name: "",
    price: 0,
    duration: 7,
    max_patients: 10,
    allow_multiple_subspecialities: false,
  });

  const [editedItem, setEditedItem] = useState({});

  const fetchItems = useCallback(async (force) => {
    await getItems({
      url: API_ENDPOINTS.SUBSCRIPTIONS,
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
    setItem({
      name: "",
      price: 0,
      duration: 7,
      max_patients: 10,
      allow_multiple_subspecialities: false,
    });
    setEditedItem({
      name: "",
      price: 0,
      duration: 0,
      max_patients: 10,
      allow_multiple_subspecialities: false,
    });
  };

  const handleAdd = async () => {
    return await addItem({
      url: API_ENDPOINTS.SUBSCRIPTION,
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
      url: `${API_ENDPOINTS.SUBSCRIPTION}/${editedItem.id}`,
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
      url: `${API_ENDPOINTS.SUBSCRIPTION}/${confirmDelete.id}`,
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
          title="Subscriptions"
          onRefresh={() => {
            fetchItems(true);
          }}
        />
        <CustomBreadCrumb
          paths={[
            {
              title: "Subscriptions",
              icon: <CurrencyRupeeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
            },
          ]}
        />
        <MyPageLayout
          isLoading={loading}
          data={data}
          noPageTitle={"No Subscriptions Found"}
          noPageButtonTitle={"Add Subscription"}
          noPageButton={() => handleOpen()}
          showViewSetting={true}
          addButton={handleOpen}
          addButtonTitle={"Add Subscription"}
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
                  "Duration",
                  "Price",
                  "Max Patients",
                  "Multiple Subspecialities",
                  "Actions",
                ]}
              >
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.duration} Days</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.max_patients}</TableCell>
                    <TableCell>
                      {item.allow_multiple_subspecialities === 1 ? (
                        <Chip color="success" label="Yes" />
                      ) : (
                        <Chip color="error" label="No" />
                      )}
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
                {data.map((item, index) => (
                  <SubscriptionCard
                    key={index}
                    item={item}
                    onEdit={() => {
                      handleEditOpen(item);
                    }}
                    onDelete={() => confirmDeleteModal(item.id)}
                  />
                ))}
              </>
            )}
          </Box>
        </MyPageLayout>
      </Box>

      <MyModal
        open={open}
        handleClose={handleClose}
        title={editMode ? "Edit Subscription" : "Add Subscription"}
        subTitle={"Fill Subscription details"}
        okButtonText={editMode ? "Update" : "Add"}
        cancelButtonText="Cancel"
        onOk={editMode ? handleUpdate : handleAdd}
        onCancel={handleClose}
        isLoading={loading}
        okButtonIcon={<SaveIcon />}
        okButtondisabled={
          editMode
            ? editedItem.name.length > 0 &&
              editedItem.max_patients > 0 &&
              editedItem.duration > 0 &&
              !loading
              ? false
              : true
            : item.name.length > 0 &&
              item.max_patients > 0 &&
              item.duration > 0 &&
              !loading
            ? false
            : true
        }
      >
        {editMode ? (
          <SubscriptionForm item={editedItem} setItem={setEditedItem} />
        ) : (
          <SubscriptionForm item={item} setItem={setItem} />
        )}
      </MyModal>
      <MyModal
        open={confirmDelete.open}
        handleClose={() => setConfirmDelete({ open: false, id: null })}
        title="Confirm Deletion"
        subTitle="Are you sure you want to delete this subscription?"
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

export default SubscriptionsScreen;
