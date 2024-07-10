/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = ({ open, handleClose, deleteHandler, message }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deleteHandler} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
