import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreateSCard from "../ui/CreateSCard";
import CreateSchoolPopup from "../ui/CreateSchoolPopup";
import ClassItem from "../ui/ClassItem";
import { useStateContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSchoolClasses } from "../services/apiSchool";
import Loading from "./Loading";
import { login } from "../services/apiauth";
import CreateClassPopup from "./CreateClassPopup";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

function InternalClasses({
  school_id,
  showCreatePopup,
  funcshowCreatePopup,
  closeshowCreatePopup,
  userData,
  data,
  setdata,
}) {
  const { isLoading: LoadingClasses, data: schooldata } = useQuery(
    ["classes", school_id],
    () => getSchoolClasses(school_id)
  );

  const { profileinfo } = useStateContext();

  if (LoadingClasses) return <Loading />;
  // if (!data) return <div>No classes found</div>;

  return (
    <>
      {(profileinfo.role == "teacher" || profileinfo.role == "admin") && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CreateSCard
            funcshowCreatePopup={funcshowCreatePopup}
            type={"Class"}
          />

          {/* <Button onClick={funcshowCreatePopup}>CreateSCard</Button> */}

          {/* <CreateSchoolPopup
            showCreatePopup={showCreatePopup}
            closeshowCreatePopup={closeshowCreatePopup}
            where={"school"}
            theid={school_id}
            data={data}
            setdata={setdata}
          /> */}

          <CreateClassPopup
            showCreatePopup={showCreatePopup}
            closeshowCreatePopup={closeshowCreatePopup}
            data={data}
            setdata={setdata}
            theid={school_id}
          />
        </Grid>
      )}

      {schooldata
        .filter((clase) => clase.class.school_id === school_id)
        .map((clase) => (
          <Grid key={clase.id} item xs={12} sm={6} md={4} lg={3}>
            <ClassItem
              school_id={school_id}
               where={"school"}
              funcshowCreatePopup={funcshowCreatePopup}
              data={data}
              setdata={setdata}
              mycalss={clase.class}
              id={userData?.data?.id}
              is_member={clase.is_member}
            />
          </Grid>
        ))}
    </>
  );
}

export default InternalClasses;
