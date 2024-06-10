import { Outlet } from "react-router-dom";

import Appbar from "../ui/Appbar";

import { useState } from "react";
import HomeDrawer from "../ui/HomeDrawer";
import Body from "../ui/Body";
import { useParams } from "react-router-dom";
import DrawerClass from "../ui/DrawerClass";
import { useStateContext } from "../context/ContextProvider";
import SearchSchoolPopup from "../ui/SearchSchoolPopup";
import Popup from "../utlis/Popup";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { editprofile } from "../services/apiauth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import  EditInformation from "../utlis/EditInformation";

function Home() {
  const [showdrawer, setShowDrawer] = useState("none");
  const [drawertype, setDrawerType] = useState("permanent");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const drawerWidth = 300;
  const { user, token, setUser, setToken, profileinfo } = useStateContext();

  const [showeditinfo, seteditinfo] = useState(false);

  const { schoolname, classname } = useParams();
  const shouldHideDrawer = schoolname && classname;

  {
    /* "first_name": "radouane",
        "last_name": "bareche",
        "email": "radouanebareche6@gmail.com",
        "is_verified": true,
        "role": "admin",
        "profile_picture": null,
        "bio": null,
        "contact_information": null, */
  }

  const first_name = useRef(null);
  const last_name = useRef(null);
  const email = useRef(null);
  const bio = useRef(null);
  const contact_information = useRef(null);
  const profile_picture = useRef(null);

  const { t } = useTranslation();

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

  const handleditinfo = () => {
    console.log("edit info");
    seteditinfo(!showeditinfo);
  };
  const closeeditinfo = () => {
    seteditinfo(false);
  };

  const funshowdrawer = () => {
    return;
  };

  const closeSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
    console.log("toggleSearchPopup", showSearchPopup);
  };

  const funShowDrawer = () => {
    setShowDrawer("block");
    setDrawerType("temporary");
  };

  const funcCloseDrawer = () => {
    setDrawerType("permanent");
    setShowDrawer("none");
  };
 
  return (
    <div>
      {!shouldHideDrawer && (
        <HomeDrawer
          toggleSearchPopup={toggleSearchPopup}
          drawerWidth={drawerWidth}
          showdrawer={showdrawer}
          drawertype={drawertype}
          funclosedrawer={funcCloseDrawer}
        />
      )}
      <Appbar
        drawerWidth={drawerWidth}
        funshowdrawer={funshowdrawer}
        handleditinfo={handleditinfo}
        closeeditinfo={closeeditinfo}
      />

      <EditInformation showeditinfo={showeditinfo} closeeditinfo={closeeditinfo} title={t("Edit Profile")} url={""} /> 
     
      <Body drawerWidth={drawerWidth}>
        {/* { profileinfo.is_verified==true? <Outlet />: "Your account is not verified yet. Please check your email for verification link."} */}
        <Outlet />
        <SearchSchoolPopup
          showSearchPopup={showSearchPopup}
          toggleSearchPopup={toggleSearchPopup}
        />
      </Body>
    </div>
  );
}

export default Home;
