import React from "react";
import { Grid } from "@mui/material";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";
import NewClassItem from "../ui/NewClassItem";
import ClassItem from "../ui/ClassItem";
import { getFunUserData } from "../services/FunUserData.js";
import { useQuery } from "@tanstack/react-query";
import { login } from "../services/apiauth.js";
import Loading from "../utlis/Loading";
import Typography from '@mui/material/Typography';
function ClassList() {
  const { t } = useTranslation();
  const { user, profileinfo } = useStateContext();

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
  if (isLoading) return <Loading />;

  return (
    <Grid container spacing={2} sx={{ padding: "25px", marginTop: "65px" }}>
      {userData.data.classes
        .filter((clase) => clase.school_id === null)
        .map((clase) => (
          <Grid key={clase.id} item xs={12} sm={6} md={4} lg={3}>
            {/* <NewClassItem mycalss={clase} school_id={0} /> */}

            <ClassItem mycalss={clase} id={0} is_member={1} />
          </Grid>
        ))}

      {userData.data.classes.length === 0 && (
        <Typography variant="h4" gutterBottom>
          {t("no_class")}
        </Typography>
      )}
    </Grid>
  );
}

export default ClassList;
