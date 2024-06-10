import Popup from "../utlis/Popup";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateSchool } from "../services/apiSchool";
import { useStateContext } from "../context/ContextProvider";
import toast from "react-hot-toast";
import { useRef } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { CreateClass } from "../services/apiClass";
import { UpdateClass } from "../services/apiClass";
import { useTranslation } from "react-i18next";
import GradeSelector from "../utlis/GradeSelector";
import { useState } from "react";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";


function CreateClassPopup({
  showCreatePopup,
  closeshowCreatePopup,
  data,
  setdata,
  theid
}) {
  
  const classname = useRef(null);
  const [fileKey, setFileKey] = useState(Date.now());
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileURL, setSelectedFileURL] = useState('');

  const [selectedGrade, setSelectedGrade] = useState(data?.grade);
  const grade_level = useRef(null);
  const subject = useRef(null);
  const classimg = useRef(null);
  const {t}=useTranslation();


  
  const queryClient = useQueryClient();

  const { mutate: create, isLoading: LoadingCreate } = useMutation({
    mutationFn: CreateClass,
    onSuccess: (data) => {
      toast.success("Class created successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("classes");
      queryClient.invalidateQueries("userData");
    },
    onError: (error) => {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    },
  });

    const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateClass,
    onSuccess: () => {
      toast.success("Class Updated Successfully");
      // setschools(prevSchools => prevSchools.filter(item => item.id !== school.id));
      console.log("School updated  successfully");
      queryClient.invalidateQueries("Classes");
      queryClient.invalidateQueries("userData");
    },
    onError: () => {
      console.log("Error creating class");
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
    classimg.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setSelectedFileName('');
    setSelectedFileURL('');
    setFileKey(Date.now()); // Force re-render the file input
  };


  const onSubmit = () => {
    const file = classimg.current?.files[0];
    const payload = new FormData();
    // payload.append("school_id", );
    payload.append("name", classname.current.value);
    payload.append("grade_level", selectedGrade);
    payload.append("subject", subject.current.value);
    // payload.append("image", file);
    payload.append("image", selectedFile);
    if(theid!=0){
      payload.append("school_id",theid);
    }
   

    console.log("Checking payload data:");

    for (let [key, value] of payload.entries()) {
        console.log(`${key}: ${value}`);
    }

    if (data == null) {
        create(payload);
        setdata(null);  
    } else {
        payload.append("id", data?.id);
        payload.append("_method", 'PUT');

      

        update(payload);
        setdata(null);  
    }
};

 console.log("this is the data",data)


  return (
    <Popup
      funcshowPopup={showCreatePopup}
      closeshowPopup={closeshowCreatePopup}
      title={data ? t("update_class") : t("create_class")}
    
      url={"../../public/ClassDefault.jpg"}
    >
      <TextField
        defaultValue={data ? data.name : ""}
        inputRef={classname}
        variant="outlined"
        label={t("class_name")}
      ></TextField>

   

      <GradeSelector selectedGrade={selectedGrade}  setSelectedGrade={setSelectedGrade}/>


      <TextField
        defaultValue={data ? data.subject : ""}
        inputRef={subject}
        variant="outlined"
        label={t("subject")}
      ></TextField>
    
    <div style={{ margin: 'auto', marginTop: '15px' }}>
        <input
          id="school-img-input"
          type="file"
          accept="image/*"
          ref={classimg}  // Reference to the input element
          style={{ display: "none" }}
          key={fileKey}
          onChange={handleFileChange}
        />
        <Button variant="contained" component="span" onClick={handleFileClick}>
          <CloudUploadIcon sx={{ marginRight: '10px' }} /> {t("select_image")}
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
    {LoadingCreate || isUpdating ? (data ? `${t("update_class")}...` : `${t("create_class")}...`) : (data ? `${t("update_class")}` : `${t("create_class")}`)}

      </Button>
    </Popup>
  );
}

export default CreateClassPopup;
