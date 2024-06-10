import React, { useRef, useState } from "react";
import { Button, TextField, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Popup from "../utlis/Popup";
import { useTranslation } from "react-i18next";
import { verifyschool } from "../services/apiSchool";
import { useStateContext } from "../context/ContextProvider";
import { ConstructionOutlined } from "@mui/icons-material";
import { useEffect } from "react";

function VerifySchoolPopup({
  showverifyschool,
  closeverifyPopup,
  data,
  setdata,
}) {
  const { t } = useTranslation();
  const { profileinfo } = useStateContext();
  const email = useRef(null);
  const phonenumber = useRef(null);
  const document = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileURL, setSelectedFileURL] = useState("");
  const [fileKey, setFileKey] = useState(Date.now());

  const queryClient = useQueryClient();
  const { mutate: verify, isLoading: LoadingVerify } = useMutation({
    mutationFn: verifyschool,
    onSuccess: () => {
      toast.success(t("your_verification_pending") + " " + t("support_team"));
      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
    },
    onError: (error) => {
      if (
        error.response.data.error ===
        "A verification request has already been sent for this school"
      ) {
        toast.error(t("your_verification_pending"));
      }
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setSelectedFileURL(URL.createObjectURL(file));
      setFileKey(Date.now());
    }
  };

  const handleFileClick = () => {
    document.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setSelectedFileName("");
    setSelectedFileURL("");
    setFileKey(Date.now());
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = new FormData();
    payload.append("email", email.current.value);
    payload.append("phone_number", phonenumber.current.value);
    if (selectedFile) {
      payload.append("document", selectedFile);
    }

    payload.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    verify({ id: profileinfo.owned_school.id, payload: payload });
  };

  const handleInvalid = (event) => {
    event.target.setCustomValidity('Please fill out this field correctly.');
  };

  const handleInput = (event) => {
    event.target.setCustomValidity('');
  };

  useEffect(() => {
    if (email.current || phonenumber.current) {
      email.current.addEventListener('invalid', handleInvalid);
      email.current.addEventListener('input', handleInput);
      
    }
    // Clean up event listeners
    return () => {
      if (email.current) {
        email.current.removeEventListener('invalid', handleInvalid);
        email.current.removeEventListener('input', handleInput);
      }
    };
  }, []);

  return (
    <Popup
      funcshowPopup={showverifyschool}
      closeshowPopup={closeverifyPopup}
      title={t("verify_school")}
      url={"../../public/SchoolDefault.jpg"}
    >
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <TextField
          required
          inputRef={email}
          variant="outlined"
          label={t("school_email")}
          onInvalid={handleInvalid}
          onInput={handleInput}
        />
        <TextField
          required
          inputRef={phonenumber}
          variant="outlined"
          label={t("school_phone")}
          onInvalid={handleInvalid}
          onInput={handleInput}
          
        />
        <Typography variant="h7" style={{ marginTop: "15px" }}>
          {t("provide_document")}
        </Typography>
        <div style={{ margin: "auto", marginTop: "15px" }}>
          <input
            id="school-file-input"
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.rtf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ref={document}
            style={{ display: "none" }}
            key={fileKey}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            onClick={handleFileClick}
          >
            <CloudUploadIcon sx={{ marginRight: "10px" }} /> {t("select_file")}
          </Button>
          <div style={{ margin: "15px" }}>{selectedFileName}</div>
          {selectedFileURL && (
            <div>
              <img
                src={selectedFileURL}
                alt="Selected"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
              <IconButton onClick={handleRemoveImage}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </div>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={LoadingVerify}
        >
          {LoadingVerify ? `${t("verify_school")}...` : `${t("verify_school")}`}
        </Button>
      </form>
    </Popup>
  );
}

export default VerifySchoolPopup;
