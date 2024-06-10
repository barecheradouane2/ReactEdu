import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CreateSCard from "../ui/CreateSCard";
import CreateSchoolPopup from "../ui/CreateSchoolPopup";
import ClassItem from "../ui/ClassItem";
import { useStateContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSchoolClasses } from "../services/apiSchool";
import Loading from "../utlis/Loading";
import { login } from "../services/apiauth";
import InternalClasses from "../utlis/InternalClasses";
import ExternalClasses from "../utlis/ExternalClasses";
import { GiConsoleController } from "react-icons/gi";
import Body from "../ui/Body";


function Classes() {
  const { user,profileinfo } = useStateContext();

  const fetchUserData = async () => {
    try {
      const response = await login(user);
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const { isLoading, data: userData } = useQuery(["userData"], fetchUserData);
  console.log(userData);
  

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const location = useLocation();
  const [isInternal, setIsInternal] = useState(false);
  const [schoolId, setSchoolId] = useState(null);
  const [data,setdata]=useState(null);

  useEffect(() => {
    if (location.state && location.state.school_id) {
      setIsInternal(true);
      setSchoolId(location.state.school_id);
    }
  }, [location.state]);

  const funcshowCreatePopup = () => {
    setShowCreatePopup(true);
  };
  
  const closeshowCreatePopup = () => {
    setShowCreatePopup(false);
  };
  if(isLoading) return <Loading />;

  return (
    <div style={{ marginTop: "0px", width: "100%" }}>
   
      <Grid container spacing={2} sx={{ padding: "25px", marginTop: "65px" }}>
        {isInternal ? (
          <InternalClasses
            school_id={schoolId}
            showCreatePopup={showCreatePopup}
            funcshowCreatePopup={funcshowCreatePopup}
            closeshowCreatePopup={closeshowCreatePopup}
            userData={userData}
            data={data}
            setdata={setdata}
           
          />
        ) : (
          <ExternalClasses 
          showCreatePopup={showCreatePopup}
          funcshowCreatePopup={funcshowCreatePopup}
          closeshowCreatePopup={closeshowCreatePopup}
          userData={userData}
          data={data}
          setdata={setdata}
          
          />
        )}
      </Grid>
    
    </div>
  );
}

export default Classes;
