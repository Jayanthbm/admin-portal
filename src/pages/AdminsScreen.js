import React, { useContext } from "react";
import { PATHS } from "../constants";
import AuthContext from "../context/auth.context";
import useAuthNavigation from "../hooks/useAuthNavigation";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Pagination,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

const AdminsScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const naviagte = useAuthNavigation(isLoggedIn, PATHS.ADMINS);

  const sampleAdmins = [
    {
      id: 1,
      name: "Admin 1",
      email: "admin1@me.com",
      createdAt: "2021-01-01",
      disabled: false,
      lastLogin: "2021-01-01",
    },
    {
      id: 2,
      name: "Admin 2",
      email: "admin2@me.com",
      createdAt: "2021-01-01",
      disabled: true,
      lastLogin: "2021-01-01",
    },
    {
      id: 3,
      name: "Admin 3",
      email: "admin3@me.com",
      createdAt: "2021-01-01",
      disabled: false,
      lastLogin: "2021-01-01",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admins
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.createdAt}</TableCell>
                <TableCell>{admin.lastLogin}</TableCell>
                <TableCell>
                  {admin.disabled ? (
                    <Chip color="error" label="Disabled" />
                  ) : (
                    <Chip color="success" label="Active" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title={admin.disabled ? "Enable" : "Disable"}>
                    <IconButton
                      color={admin.disabled ? "success" : "warning"}
                      sx={{ borderRadius: "50%" }}
                    >
                      {admin.disabled ? <CheckIcon /> : <BlockIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" sx={{ borderRadius: "50%" }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton color="primary" sx={{ borderRadius: "50%" }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} mt={2} direction="row" justifyContent="center">
        <Pagination
          count={1}
          page="1"
          onChange={(e, page) => console.log("page", page)}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </Stack>
    </Box>
  );
};

export default AdminsScreen;
