import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (type) => {
    if(type === 'Remove'){
      console.log('Remove');
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        ..
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you Suew you want to remove this member
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose('Cancel')}>Cancel</Button>
          <Button onClick={()=>handleClose('Remove')} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
