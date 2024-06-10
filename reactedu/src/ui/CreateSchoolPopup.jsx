import React, { useRef, useState } from "react";
import {
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CreateSchool, UpdateSchool } from "../services/apiSchool";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Popup from "../utlis/Popup";
import { useTranslation } from "react-i18next";

function CreateSchoolPopup({
  showCreatePopup,
  closeshowCreatePopup,
  data,
  setdata,
}) {
  const { t } = useTranslation();
  const schoolname = useRef(null);
  const schooladdress = useRef(null);
  const schoolimgInput = useRef(null);  // Reference to the input element

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileURL, setSelectedFileURL] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());

  const queryClient = useQueryClient();

  const { mutate: create, isLoading: LoadingCreate } = useMutation({
    mutationFn: CreateSchool,
    onSuccess: () => {
      toast.success(t("create_success"));
      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
    },
    onError: (error) => {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateSchool,
    onSuccess: () => {
      toast.success(t("update_success"));
      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
    },
    onError: () => {
      toast.error(t("update_error"));
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);  // Store the file itself
      setSelectedFileName(file.name);
      setSelectedFileURL(URL.createObjectURL(file));
      setFileKey(Date.now()); // Force re-render the file input
    }
  };

  const handleFileClick = () => {
    schoolimgInput.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setSelectedFileName('');
    setSelectedFileURL('');
    setFileKey(Date.now()); // Force re-render the file input
  };

  const onSubmit = () => {
    const payload = new FormData();
    payload.append("name", schoolname.current.value);
    payload.append("address", schooladdress.current.value);
    if (selectedFile) {
      payload.append("image", selectedFile);  // Append the file itself
    }

    // Log the FormData contents
    payload.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    if (data == null) {
      create(payload);
      setdata(null);
    } else {
      payload.append("school_id", data?.id);
      payload.append("_method", "PUT");
      update(payload);
    }
  };

  return (
    <Popup
      funcshowPopup={showCreatePopup}
      closeshowPopup={closeshowCreatePopup}
      title={data ? t("update_school") : t("create_school")}
      url={"../../public/SchoolDefault.jpg"}
    >
      <TextField
        defaultValue={data ? data.name : ""}
        inputRef={schoolname}
        variant="outlined"
        label={t("school_name")}
      />
      <TextField
        defaultValue={data ? data.address : ""}
        inputRef={schooladdress}
        variant="outlined"
        label={t("address")}
      />
      <div style={{ margin: 'auto', marginTop: '15px' }}>
        <input
          id="school-img-input"
          type="file"
          accept="image/*"
          ref={schoolimgInput}  // Reference to the input element
          style={{ display: "none" }}
          key={fileKey}
          onChange={handleFileChange}
        />
        <Button variant="contained" component="span" onClick={handleFileClick}>
          <CloudUploadIcon sx={{ marginRight: '10px' }} /> {t("select_school_image")}
        </Button>
        <div style={{ margin: '15px' }}>{selectedFileName}</div>
        {selectedFileURL && (
          <div>
            <img src={selectedFileURL} alt="Selected" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
            <IconButton onClick={handleRemoveImage}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
      <Button
        color="primary"
        variant="contained"
        onClick={onSubmit}
        disabled={LoadingCreate || isUpdating}
      >
        {LoadingCreate || isUpdating ? (data ? `${t("update_school")}...` : `${t("create_school")}...`) : (data ? `${t("update_school")}` : `${t("create_school")}`)}
      </Button>
    </Popup>
  );
}

export default CreateSchoolPopup;
