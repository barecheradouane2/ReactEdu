import React, { useContext, useRef } from "react";
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
import InputFileUpload from "./InputFileUpload";
import { CreateSchool } from "../services/apiSchool";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateSchool } from "../services/apiSchool";
import { useStateContext } from "../context/ContextProvider";

import toast from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Classcreation from "../utlis/Classcreation";
import Schoolcreation from "../utlis/schoolcreation";
import { CreateClass } from "../services/apiClass";
import { UpdateClass } from "../services/apiClass";




function CreateClassInSchool({showCreatePopup, closeshowCreatePopup, school}) {

    const schoolimg = useRef(null);
    const classname = useRef(null);
    const grade_level = useRef(null);
    const subject = useRef(null);

    const queryClient = useQueryClient();

    const { mutate: CreateClasss, isLoading: classloading } = useMutation({
        mutationFn: CreateClass,
        onSuccess: () => {
          toast.success("Class created successfully");
          queryClient.invalidateQueries("classes");
        },
        onError: () => {
          toast.error("Error creating class");
        },
      });
    
      const { mutate: UpdateClasss ,isloading:isUpdatingclass} = useMutation({
        mutationFn: UpdateClass,
        onSuccess: () => {
          toast.success("Class updated successfully");
          queryClient.invalidateQueries("classes");
        },
        onError: () => {
          toast.error("Error updating class");
        },
      });



      const submitClass = (e) => {
        e.preventDefault();
        const file = schoolimg.current?.files[0];
        const payload = new FormData();
        payload.append("name", classname.current.value);
        payload.append("grade_level", grade_level.current.value);
        payload.append("subject", subject.current.value);
        // payload.append("image", file);
    
        CreateClasss(payload);
      };
    
      const onupdateClass = (e) => {
        e.preventDefault( );
        const file = schoolimg.current?.files[0];
        const payload = new FormData();
        payload.append("id", school.id);
        payload.append("_method", "PUT");
        payload.append("name", classname.current.value);
        payload.append("grade_level", grade_level.current.value);
        payload.append("subject", subject.current.value);
        // payload.append("image", file);
    
        UpdateClasss(payload);
      };







    return (
        <Dialog
        open={showCreatePopup}
        onClose={closeshowCreatePopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
        
          {"Create Class"}
          <IconButton onClick={() => { closeshowCreatePopup() }} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <div className="flex justify-center">
              {" "}
              <img
                src={
                 
                 "../../public/ClassDefault.jpg"
                }
                alt="Class"
                style={{ width: "200px", height: "150px" }}
              ></img>
            </div>
            
  
            
              <Classcreation
                classname={classname}
                grade_level={grade_level}
                subject={subject}
                // schoolimg={schoolimg}
               school={school}
                onUpdate={onupdateClass}
                onSubmit={submitClass}
                isLoading={classloading}
                isUpdating={isUpdatingclass}
              />
            
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    )
}

export default CreateClassInSchool
