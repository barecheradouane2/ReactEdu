

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ConfirmationModal({ open, message,data, onConfirm, onCancel }) {
 


  return (
    <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
  );
}
