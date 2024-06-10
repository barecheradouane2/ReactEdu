import Popup from "../utlis/Popup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { editprofile } from "../services/apiauth";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useStateContext } from "../context/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import fetchUserData from "../services/fetchUserData";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

function EditInformation({ showeditinfo, closeeditinfo, title, url }) {
  const { t } = useTranslation();

  const first_name = useRef(null);
  const last_name = useRef(null);
  const email = useRef(null);
  const bio = useRef(null);
  const contact_information = useRef(null);
  const profile_picture = useRef(null);


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileURL, setSelectedFileURL] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());


  const queryClient = useQueryClient();

  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: editprofile,
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
    onError: () => {
      console.log("error");
    },
  });
 

  const { isLoading, data: userData } = useQuery(["userData"], fetchUserData);

  if (isLoading) return <div>Loading...</div>;


  console.log(userData.data.first_name + userData.data.last_name + userData.data.email + userData.data.bio + userData.data.contact_information + userData.data.profile_picture);



  const handleditsubmit = () => {
    const payload = new FormData();
    payload.append("first_name", first_name.current.value);
    payload.append("last_name", last_name.current.value);
    payload.append("email", last_name.current.value);
    payload.append("bio", last_name.current.value);
    payload.append("contact_information", last_name.current.value);
    if (selectedFile) {
      payload.append("image", selectedFile);  // Append the file itself
    }


  };

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
    profile_picture.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setSelectedFileName('');
    setSelectedFileURL('');
    setFileKey(Date.now()); // Force re-render the file input
  };
 

  return (
    <Popup
      funcshowPopup={showeditinfo}
      closeshowPopup={closeeditinfo}
      title={title}
      url={"../../public/avatar.png"}
    >
      {/* <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        // alt={}
        src={}
      ></Avatar> */}
      <TextField
         defaultValue={userData.data.first_name}
       // defaultChecked={userData.data.first_name}
        inputRef={first_name}
        variant="outlined"
        label={t("first_name")}
      ></TextField>
      <TextField
         defaultValue={userData.data.last_name}
        inputRef={last_name}
        variant="outlined"
        label={t("last_name")}
      ></TextField>
      <TextField
         defaultValue={userData.data.email}
        defaultChecked={userData.data.email}
        type="email"
        inputRef={email}
        variant="outlined"
        label={t("email")}
      ></TextField>
      <TextField
         defaultValue={userData.data.bio}
        // defaultChecked={userData.data.bio}
        inputRef={bio}
        variant="outlined"
        label={t("bio")}
      ></TextField>
      <TextField
        type="number"
         defaultValue={userData.data.contact_information}

        inputRef={contact_information}
        variant="outlined"
        label={t("contact_info")}
      ></TextField>

<div style={{ margin: 'auto', marginTop: '15px' }}>
        <input
          id="school-img-input"
          type="file"
          accept="image/*"
          ref={profile_picture}  // Reference to the input element
          style={{ display: "none" }}
          key={fileKey}
          onChange={handleFileChange}
        />
        <Button variant="contained" component="span" onClick={handleFileClick}>
          <CloudUploadIcon sx={{ marginRight: '10px' }} /> {t("picture")}
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
        onClick={handleditsubmit}
        disabled={isUpdating}
      >
        Edit Profile
      </Button>
    </Popup>
  );
}

export default EditInformation;
