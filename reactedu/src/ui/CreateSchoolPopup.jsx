import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"

import InputFileUpload from "./InputFileUpload";

function CreateSchoolPopup({showCreatePopup,closeshowCreatePopup}) {
    return (
        <Dialog 
        // fullScreen 
        open={showCreatePopup} onClose={closeshowCreatePopup} fullWidth maxWidth="sm">
            <DialogTitle>School Creation  <IconButton onClick={closeshowCreatePopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
            <DialogContent>
                {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                <Stack spacing={2} margin={2}>
                  <TextField variant="outlined" label="Name"></TextField>
                  <TextField variant="outlined" label="Address"></TextField>
                
                 < InputFileUpload/>
                  
                  <Button color="primary" variant="contained">CREATE</Button>
                </Stack>
            </DialogContent>
            <DialogActions>
            {/* <Button color="success" variant="contained">Yes</Button>
                <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default CreateSchoolPopup
