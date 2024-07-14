import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: 0,
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const InfoRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const SubscriptionCard = ({ item, onEdit, onDelete }) => {
  return (
    <StyledCard>
      <StyledCardHeader
        title={item.name}
        action={
          <>
            <IconButton onClick={onEdit} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Edit">
                <EditIcon color="primary" />
              </Tooltip>
            </IconButton>
            <IconButton onClick={onDelete} sx={{ pb: 1, pt: 1 }}>
              <Tooltip title="Delete">
                <DeleteIcon color="error" />
              </Tooltip>
            </IconButton>
          </>
        }
      />
      <Divider />
      <StyledCardContent>
        <InfoRow>
          <CurrencyRupeeIcon />
          <Typography variant="body1">Price: ₹{item.price}</Typography>
        </InfoRow>
        <InfoRow>
          <EventIcon />
          <Typography variant="body1">
            Duration: {item.duration} days
          </Typography>
        </InfoRow>
        <InfoRow>
          <PeopleIcon />
          <Typography variant="body1">
            Max Patients: {item.max_patients}
          </Typography>
        </InfoRow>
        <InfoRow>
          {item.allow_multiple_subspecialities ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
          <Typography variant="body1">
            Subspecialities Allowed:{" "}
            {item.allow_multiple_subspecialities ? "Yes" : "No"}
          </Typography>
        </InfoRow>
      </StyledCardContent>
    </StyledCard>
  );
};

export default SubscriptionCard;
