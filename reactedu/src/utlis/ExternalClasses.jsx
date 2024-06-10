import { Grid } from "@mui/material";
import ClassItem from "../ui/ClassItem";
import CreateSCard from "../ui/CreateSCard";
//
import CreateClassPopup from "./CreateClassPopup";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import {TextField, Button} from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Popup from "./Popup";

import { CreateClass, UpdateClass } from "../services/apiClass";

import { toast } from "react-hot-toast";


function ExternalClasses({
  userData,
  showCreatePopup,
  funcshowCreatePopup,
  closeshowCreatePopup,
  data,
  setdata,
}) {
  const { profileinfo } = useStateContext();


  return (
    <>
      {(profileinfo.role == "teacher" || profileinfo.role == "admin") && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CreateSCard
            funcshowCreatePopup={funcshowCreatePopup}
            type={"Class"}
          />

          {/* <Button onClick={funcshowCreatePopup}>CreateSCard</Button> */}
       
          
        

          <CreateClassPopup
            showCreatePopup={showCreatePopup}
            closeshowCreatePopup={closeshowCreatePopup}
            data={data}
            setdata={setdata}
            theid={0}
          />
        </Grid>
      )}
      {userData.data.classes
        .filter((clase) => clase.school_id === null)
        .map((clase) => (
          <Grid key={clase.id} item xs={12} sm={6} md={4} lg={3}>
            <ClassItem
              funcshowCreatePopup={funcshowCreatePopup}
              data={data}
              setdata={setdata}
              mycalss={clase}
              id={userData.data.id}
              is_member={1}
            />
          </Grid>
        ))}
    </>
  );
}

export default ExternalClasses;
