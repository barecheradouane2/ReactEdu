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
import Popup from "../utlis/Popup";
import { useRef } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { CreateSchool, UpdateSchool } from "../services/apiSchool";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Body from "../ui/Body";
import Verifyschool from "./Verifyschool";
import VerifySchoolPopup from "./VerifySchoolPopup";
import { useTranslation } from "react-i18next";

function SchoolCards({ drawerWidth }) {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [showverifyschool,setshowverifyschool]=useState(false);
  const [data, setdata] = useState(null);
  const { t } = useTranslation();

  // const schoolname = useRef(null);
  // const schooladdress = useRef(null);
  // const schoolimg = useRef(null);

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
  // const queryClient = useQueryClient();

  // const { mutate: create, isLoading: createLoading } = useMutation({
  //   mutationFn: CreateSchool,
  //   onSuccess: (data) => {
  //     toast.success("School created successfully");
  //     //setschools(prevSchools => [...prevSchools, data]);

  //     queryClient.invalidateQueries("schools");
  //     queryClient.invalidateQueries("userData");
  //   },
  //   onError: () => {
  //     toast.error("Error  of creating school");
  //   },
  // });
  // const { mutate: update, isLoading: isUpdating } = useMutation({
  //   mutationFn: UpdateSchool,
  //   onSuccess: () => {
  //     toast.success("School Updated Successfully");
  //     // setschools(prevSchools => prevSchools.filter(item => item.id !== school.id));
  //     console.log("School updated  successfully");
  //     queryClient.invalidateQueries("schools");
  //     queryClient.invalidateQueries("userData");
  //   },
  //   onError: () => {
  //     console.log("Error creating school");
  //   },
  // });

  // const onSubmit = () => {
  //   const file = schoolimg.current?.files[0];
  //   const payload = new FormData();
  //   payload.append("name", schoolname.current.value);
  //   payload.append("address", schooladdress.current.value);
  //   payload.append("image", file);

  //   create(payload);
  // };

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

  const toggleverifyschool = () => {
    console.log("toggleverifyschool");
    setshowverifyschool(!showverifyschool);
  }

  const closeverifyPopup = () => {
    setshowverifyschool(false);
  }

  return (
    <Grid container spacing={2} sx={{ padding: "25px", marginTop: "65px" }}>
      {profileinfo.role == "admin" && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CreateSCard
            funcshowCreatePopup={funcshowCreatePopup}
            type={"School/Class"}
          />

          <CreateSchoolPopup
            showCreatePopup={showCreatePopup}
            closeshowCreatePopup={closeshowCreatePopup}
            where={"everyone"}
            theid={null}
            data={data}
            setdata={setdata}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SearchSchool toggleSearchPopup={toggleSearchPopup} type={"nocode"}>
          {t("search_school")}
        </SearchSchool>
        <SearchSchoolPopup
          showSearchPopup={showSearchPopup}
          toggleSearchPopup={toggleSearchPopup}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <SearchSchool toggleSearchPopup={toggleJoinPopup} type={"code"}>
          {t("join_school")} / {t("join_class")}
        </SearchSchool>
        <JoinSchoolClassPopup
          showJoinPopup={showJoinPopup}
          toggleJoinPopup={toggleJoinPopup}
          
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Verifyschool toggleverifyschool={toggleverifyschool} type={"code"}>
          {t("verify_school")}
        </Verifyschool>
        <VerifySchoolPopup
          showverifyschool={showverifyschool}
          closeverifyPopup={closeverifyPopup}
        />
      </Grid>








      {/* {userData.data.owned_school.map((school) => ( */}
        <Grid key={userData.data.owned_school.id} item xs={12} sm={6} md={4} lg={3}>
          <SchoolItem
            school={userData.data.owned_school}
            id={userData.data.id}
            setdata={setdata}
            funcshowCreatePopup={funcshowCreatePopup}
          />
        </Grid>
      {/* ))} */}

      {/* {userData.data.classes
        .filter((clase) => clase.school_id === null)
        .map((clase) => (
          <Grid key={clase.id} item xs={12} sm={6} md={4} lg={3}>
            <ClassItem mycalss={clase} id={userData.data.id} is_member={1} />
          </Grid>
        ))} */}
    </Grid>
    // </Body>
  );
}

export default SchoolCards;
