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

function CreateSchoolPopup({ showCreatePopup, closeshowCreatePopup, school }) {
  let { user, setUser, _setUser } = useStateContext();
  //this it dosen't work
  const [type, setType] = useState( school && school.teacher_id !== undefined? "Class" : "School");
  console.log(school && school.teacher_id !== undefined);
  console.log(type);

  
  const schoolname = useRef(null);
  const schooladdress = useRef(null);
  const schoolimg = useRef(null);

  const classname = useRef(null);
  const grade_level = useRef(null);
  const subject = useRef(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: CreateSchool,
    onSuccess: (data) => {
      toast.success("School created successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
    },
    onError: () => {
      toast.error("Error  of creating school");
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateSchool,
    onSuccess: () => {
      toast.success("School Updated Successfully");
      // setschools(prevSchools => prevSchools.filter(item => item.id !== school.id));
      console.log("School updated  successfully");
      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
    },
    onError: () => {
      console.log("Error creating school");
    },
  });

  const onSubmit = () => {
    const file = schoolimg.current?.files[0];
    const payload = new FormData();
    payload.append("name", schoolname.current.value);
    payload.append("address", schooladdress.current.value);
    payload.append("image", file);

    mutate(payload);
  };
  const onUpdate = () => {
    const file = schoolimg.current?.files[0];
    const payload = new FormData();
    payload.append("name", schoolname.current.value);
    payload.append("address", schooladdress.current.value);
    payload.append("image", file);
    update(payload);
  };
  // dealing wtih class creation and update
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

  const currencies = [
    {
      value: "School",
      label: "School",
    },
    {
      value: "Class",
      label: "Class",
    },
  ];

  return (
    <Dialog
      open={showCreatePopup}
      onClose={closeshowCreatePopup}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {" "}
        {school != null
          ? "Edit School School/Class"
          : "Create School/Class"}{" "}
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
                type == "School"
                  ? "../../public/SchoolDefault.jpg"
                  : "../../public/ClassDefault.jpg"
              }
              alt="school"
              style={{ width: "200px", height: "150px" }}
            ></img>
          </div>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue={type}
            disabled={school != null}
            helperText="Please select your Type of School/Class"
            onChange={(e) => setType(e.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {type == "School" ? (
            <Schoolcreation
              school={school}
              schoolname={schoolname}
              schooladdress={schooladdress}
              schoolimg={schoolimg}
              onUpdate={onUpdate}
              onSubmit={onSubmit}
              isLoading={isLoading}
              isUpdating={isUpdating}
            />
          ) : (
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
          )}
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default CreateSchoolPopup;
