

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useTranslation } from 'react-i18next';
export default function ConfirmationModal({ open, message,data, onConfirm, onCancel }) {
  const{t}=useTranslation();

  return (
    <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{t("confirm")}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
      {t("cancel")}
      </Button>
      <Button onClick={onConfirm} variant="outlined" color="error" autoFocus>
      {t("confirm")}
      </Button>
    </DialogActions>
  </Dialog>
  );
}
