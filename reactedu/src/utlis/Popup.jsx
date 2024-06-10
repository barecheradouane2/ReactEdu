import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Classcreation from "./Classcreation";
import { useState } from "react";
import { FaChildren } from "react-icons/fa6";

function Popup({ children, funcshowPopup, closeshowPopup, title,url}) {
  
  return (
    <Dialog
      open={funcshowPopup}
      onClose={closeshowPopup}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {title}
        <IconButton
          onClick={() => {
            closeshowPopup();
          }}
          style={{ float: "right" }}
        >
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>{" "}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <div className="flex justify-center">
          {/* <img src={url} width={'110px'} /> */}
          <img
              src={
               url
              }
             
              style={{ width: "200px", height: "150px" }}
            ></img>
          </div>

        {children}
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default Popup;
