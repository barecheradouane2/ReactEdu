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

import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import JoinSchoolPopup from "./JoinSchoolPopup";
import JoinClassPopup from "./JoinClassPopup";

import { useState } from "react";

function JoinSchoolClassPopup({ showJoinPopup, toggleJoinPopup }) {
  const [type, setType] = useState(true);

  return (
    <Dialog
      open={showJoinPopup}
      onClose={toggleJoinPopup}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {" "}
        Join School / Class{" "}
        <IconButton onClick={toggleJoinPopup} style={{ float: "right" }}>
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>{" "}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2} sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <dir>
                <Button  onClick={()=>setType(false)}>Join Class</Button>
                <Button onClick={()=>setType(true)}>Join School</Button>
            </dir>
            {type ? (   <JoinSchoolPopup showJoinPopup={showJoinPopup} toggleJoinPopup={toggleJoinPopup} />) : ( <JoinClassPopup showJoinPopup={showJoinPopup} toggleJoinPopup={toggleJoinPopup} />) }  
         

           
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default JoinSchoolClassPopup;
