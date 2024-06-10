// import { Toolbar, Typography } from "@mui/material"
import { Divider, Drawer } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { LeaveSchool } from "../services/apiSchool";
import { toast } from "react-hot-toast";
import { useTranslation, initReactI18next } from "react-i18next";
import { useStateContext } from "../context/ContextProvider";
import SearchSchoolPopup from "./SearchSchoolPopup";

function Drawers({ drawerWidth, showdrawer, drawertype, funclosedrawer }) {
  const { t, i18n } = useTranslation();
  const { profileinfo } = useStateContext();
  // let schooladmin=0;
  // if (profileinfo) {
  //    schooladmin = profileinfo.owned_school?.schooladmin;
  //   // Use schooladmin here
  // } else {
  // }
  // const {schooladmin}=profileinfo?.owned_school;

  const [active, setActive] = useState("School");

  const Navigate = useNavigate();
  function handleactive(params) {
    setActive(params);
  }

  let { schoolname } = useParams();
  // Decode the schoolname from URI
  schoolname = decodeURIComponent(schoolname);

  const handleSearch = (searchText) => {
    // Implement your search logic here using the searchText
    console.log("Searching for:", searchText);
  };
  // i have to check this men
  const location = useLocation();
  const { school_id } = location.state;
  const { schoolName } = useParams();

  const isAdminOfschool=profileinfo?.owned_school.id==school_id?true:false;


  const queryClient = useQueryClient();
  const { isLoading, mutate: leaveSchool } = useMutation({
    mutationFn: LeaveSchool,
    onSuccess: (data) => {
      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleaveschool() {
    leaveSchool(school_id);
    Navigate("/schools");
  }



  return (
    <Drawer
      sx={{
        display: { xs: `${showdrawer}`, sm: "block" },
        width: `${drawerWidth}px`,
        // position: 'absolute',
        // zIndex:10,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant={drawertype}
      anchor={i18n.language === "ar" ? "right" : "left"}
      open={true}
      onClose={() => {
        funclosedrawer();
      }}
    >
      {/* <Typography variant="h6" noWrap sx={{color:'#4385F5',textAlign:'center',mt:'30px'}}>   <SchoolIcon />EduConnect</Typography> */}

      <div>
        <img src="../../public/logo.png" alt="" />
      </div>

      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <SearchInput onSearch={handleSearch} />

      <List>
        <Link
          to={`/home/schools/${schoolname}`}
          state={{ school_id: school_id }}
          style={{ textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleactive("School");
              }}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("school")}
                sx={{
                  color: active === "School" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          to="/home/schools"
          state={{ school_id: school_id }}
          style={{ textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleactive("Home");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("home")}
                sx={{
                  color: active === "Home" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          to={`/home/schools/${schoolname}/classes`}
          state={{ school_id: school_id }}
          style={{ textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleactive("Classes")}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  profileinfo.role == "teacher" || profileinfo.role == "admin"
                    ?t("manage_classes") 
                    : t("classes")
                }
                sx={{
                  color: active === "Classes" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

      

        {isAdminOfschool && (
          <Link
            to={`/home/schools/${schoolname}/Members`}
            state={{ school_id: school_id }}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleactive("Members")}>
                <ListItemIcon>
                  <Diversity3Icon />
                </ListItemIcon>
                <ListItemText
                  primary={t("manage_members")}
                  sx={{
                    color: active === "Members" ? "var(--color-blue-700)" : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <Link
          to={`/home/schools/${schoolName}/bookmarks`}
          state={{ school_id: school_id }}
          style={{ textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleactive("BookMarks")}>
              <ListItemIcon>
                <BookmarkAddIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("bookmarks")}
                sx={{
                  color: active === "BookMarks" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider />

        {profileinfo.role == "parent" && (
          <Link
            to={`/home/schools/${schoolname}/Associate`}
            state={{ school_id: school_id }}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleactive("ManageChildren")}>
                <ListItemIcon>
                  <EscalatorWarningIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("associate_student")}
                  sx={{
                    color:
                      active === "ManageChildren"
                        ? "var(--color-blue-700)"
                        : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        {isAdminOfschool&& (
          <Link
            to={`/home/schools/${schoolname}/joinrequests`}
            state={{ school_id: school_id }}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleactive("joinrequests")}>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("school_requests")}
                  sx={{
                    color:
                      active === "joinrequests" ? "var(--color-blue-700)" : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        {/* <Link
          to={`/home/schools/${schoolname}/settings`}
          state={{ school_id: school_id }}
          style={{ textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={()=>handleactive('Settings')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings"  sx={{
              
              color: active === "Settings" ? "var(--color-blue-700)" : "",
            }} />
            </ListItemButton>
          </ListItem>
        </Link> */}
      </List>
  

      { !isAdminOfschool && (
        <Link
        to={`/home/schools/${schoolname}/`}
        state={{ school_id: school_id }}
        style={{ textDecoration: "none" }}
      >
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleaveschool()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("leave1")}
              sx={{
                color: active === "LogoutIcon" ? "var(--color-blue-700)" : "",
              }}
            />
          </ListItemButton>
        </ListItem>
      </Link>



      )}
      
    </Drawer>
  );
}

export default Drawers;
