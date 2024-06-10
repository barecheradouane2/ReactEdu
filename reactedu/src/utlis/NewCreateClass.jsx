
import React, { useRef } from "react";
import { TextField, Button } from "@mui/material";
import Popup from "./Popup";
import { CreateClass, UpdateClass } from "../services/apiClass";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";


function NewCreateClass({showCreatePopup,closeshowCreatePopup}) {

    
  const { t } = useTranslation();

  const classname = useRef(null);
  const grade_level = useRef(null);
  const subject = useRef(null);
  const classimg = useRef(null);
  
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


  const onSubmit = () => {
    const file = classimg.current?.files[0];
    const payload = new FormData();
    // payload.append("school_id", );
    payload.append("name", classname.current.value);
    payload.append("grade_level", grade_level.current.value);
    payload.append("subject", subject.current.value);
    payload.append("image", file);
    
   

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
    return (
       
        <Popup
        funcshowPopup={showCreatePopup}
        closeshowPopup={closeshowCreatePopup}
        title={t("create_class")}
        url={"../../public/ClassDefault.jpg"}
      >
        <TextField
          defaultValue={data ? data.name : ""}
          inputRef={classname}
          variant="outlined"
          label={t("class_name")}
        ></TextField>
        <TextField
          defaultValue={data ? data.grade : ""}
          inputRef={grade_level}
          variant="outlined"
          label={t("grade_level")}
        ></TextField>
        <TextField
          defaultValue={data ? data.subject : ""}
          inputRef={subject}
          variant="outlined"
          label={t("subject")}
        ></TextField>
        <input type="file" accept="image/*" ref={classimg} />

        <Button
          color="primary"
          variant="contained"
          onClick={onSubmit}
          disabled={LoadingCreate || isUpdating}
        >
          {LoadingCreate || isUpdating
            ? `${t("create_class")}...`
            : t("create_class")}
        </Button>
      </Popup>
    )
}

export default NewCreateClass
