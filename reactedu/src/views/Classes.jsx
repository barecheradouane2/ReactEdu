import React, { useState } from "react";
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





function Classes() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const fetchUserData = async () => {
    try {
      const response = await login(user);

      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };


  const { user } = useStateContext();
  const { isLoading, data: userData } = useQuery(["userData"], fetchUserData);
  

  const funcshowCreatePopup = () => {
    setShowCreatePopup(true);
  };
  const closeshowCreatePopup = () => {
    setShowCreatePopup(false);
  };

  const location = useLocation();
  const { school_id } = location.state;

  const { isLoading: LoadingClasses, data } = useQuery(
    ["SchoolClasses", school_id],
    () => getSchoolClasses(school_id)
  );

  

  if(LoadingClasses) return <Loading/>;

  console.log(data);



  

  return (
    <div style={{ marginTop: "0px", width: "100%" }}>
      <Grid container spacing={2} sx={{ padding: "25px", marginTop: "65px" }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CreateSCard funcshowCreatePopup={funcshowCreatePopup}  type={'Class'}/>
          <CreateSchoolPopup
            showCreatePopup={showCreatePopup}
            closeshowCreatePopup={closeshowCreatePopup}
            where={'school'}
            theid={school_id}
          />
        </Grid>

       
        {data.filter((clase) => clase.class.school_id === school_id).map((clase) => (
            <Grid key={clase.id} item xs={12} sm={6} md={4} lg={3}>
              <ClassItem mycalss={clase.class}  is_member={clase.is_member} id={userData.data.id} where={'school'} />
            </Grid>
          ))
          }
      </Grid>
    </div>
  );
}

export default Classes;
