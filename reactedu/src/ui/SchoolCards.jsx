import { Grid } from "@mui/material";
import SchoolItem from "./SchoolItem";
import CreateSCard from "../ui/CreateSCard";
import SearchSchool from "./SearchSchool";
import CreateSchoolPopup from "./CreateSchoolPopup";
import SearchSchoolPopup from "./SearchSchoolPopup";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // Assuming you're using tanstack/react-query
import { getSchools } from "../services/apiSchool";
import JoinSchoolPopup from "../utlis/JoinSchoolPopup";
import { useStateContext } from "../context/ContextProvider";
import { login } from "../services/apiauth";
import Loading from "../utlis/Loading";
import JoinSchoolClassPopup from "../utlis/JoinSchoolClassPopup";
import ClassItem from "./ClassItem";

function SchoolCards() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  const { user } = useStateContext();

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

  

  const { data: fetchedSchools } = useQuery(["schools"], getSchools);
  if (isLoading) return <Loading />;

  const funcshowCreatePopup = () => {
    setShowCreatePopup(true);
  };

  const closeshowCreatePopup = () => {
    setShowCreatePopup(false);
  };

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  const toggleJoinPopup = () => {
    setShowJoinPopup(!showJoinPopup);
  };

  return (
    <Grid container spacing={2} sx={{ padding: "25px", marginTop: "65px" }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CreateSCard funcshowCreatePopup={funcshowCreatePopup} />
        <CreateSchoolPopup
          showCreatePopup={showCreatePopup}
          closeshowCreatePopup={closeshowCreatePopup}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SearchSchool toggleSearchPopup={toggleSearchPopup} type={"nocode"}>
          Join School
        </SearchSchool>
        <SearchSchoolPopup
          showSearchPopup={showSearchPopup}
          toggleSearchPopup={toggleSearchPopup}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SearchSchool toggleSearchPopup={toggleJoinPopup} type={"code"}>Join By Code</SearchSchool>
        <JoinSchoolClassPopup
          showJoinPopup={showJoinPopup}
          toggleJoinPopup={toggleJoinPopup}
        />
      </Grid>
      {userData.data.schools.map((school) => (
        <Grid key={school.id} item xs={12} sm={6} md={4} lg={3}>
          <SchoolItem school={school} id={userData.data.id} />
        </Grid>
      ))}

      {userData.data.classes
        .filter((clase) => clase.school_id === null)
        .map((clase) => (
          <Grid key={clase.id} item xs={12} sm={6} md={4} lg={3}>
            <ClassItem mycalss={clase} id={userData.data.id} />
          </Grid>
        ))}
    </Grid>
  );
}

export default SchoolCards;
