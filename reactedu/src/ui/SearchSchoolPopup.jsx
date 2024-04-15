import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"





function SearchSchoolPopup({showSearchPopup,toggleSearchPopup}) {
    return (
        <Dialog 
        // fullScreen 
        open={showSearchPopup} onClose={toggleSearchPopup} fullWidth maxWidth="sm">
            <DialogTitle> Search School  <IconButton onClick={toggleSearchPopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
            <DialogContent>
                {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                <Stack spacing={2} margin={2}>
                  <TextField variant="outlined" label="Name"></TextField>
                  
                
                
                  
                  {/* <Button color="primary" variant="contained">CREATE</Button> */}
                </Stack>
            </DialogContent>
            <DialogActions>
            {/* <Button color="success" variant="contained">Yes</Button>
                <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default SearchSchoolPopup
