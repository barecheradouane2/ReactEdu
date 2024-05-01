
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
  } from "@mui/material";

function Schoolcreation({school,schoolname,schooladdress,schoolimg,onSubmit,onUpdate,isUpdating,isLoading}) {
    return (
        <>

        <TextField
        defaultValue={school != null ? school.name : ""}
        inputRef={schoolname}
        variant="outlined"
        label="Name"
      ></TextField>
      <TextField
        defaultValue={school != null ? school.address : ""}
        inputRef={schooladdress}
        variant="outlined"
        label="Address"
      ></TextField>
      <input type="file" accept="image/*" ref={schoolimg} />


      {school != null ? (
            <Button
              color="primary"
              variant="contained"
              onClick={onUpdate}
              disabled={isLoading}
            >
              {isUpdating ? "Updating..." : "Save"}
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "CREATE"}
            </Button>
          )}

      </>
    )
}

export default Schoolcreation
