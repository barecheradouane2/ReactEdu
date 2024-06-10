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
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import ExploreIcon from "@mui/icons-material/Explore";
import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation, initReactI18next } from "react-i18next";
import { useStateContext } from "../context/ContextProvider";
import { FaSchool } from "react-icons/fa6";
import { RiFontSize } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";

function HomeDrawer({
  toggleSearchPopup,
  drawerWidth,
  showdrawer,
  drawertype,
  funclosedrawer,
}) {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [active, setActive] = useState(location.pathname.split("/")[2]);
  const { profileinfo } = useStateContext();

  const Navigate = useNavigate();
  function handleactive(params) {
    setActive(params);
  }

  const handleSearch = (searchText) => {
    // Implement your search logic here using the searchText
    console.log("Searching for:", searchText);
  };

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
      <SearchInput
        onSearch={handleSearch}
        toggleSearchPopup={toggleSearchPopup}
      />

      <List>
        <Link to={`/home/explore`} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleactive("explore")}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("explore")}
                sx={{
                  color: active === "explore" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {profileinfo.role == "admin" && (
          <Link to={`/home/schools`} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleactive("schools");
                }}
              >
                <ListItemIcon>
                  <FaSchool sx={{ fontsize: "25px" }} size="25px" />
                </ListItemIcon>
                <ListItemText
                  // primary={t('schools')}
                  primary={"manage_school"}
                  sx={{
                    color: active === "schools" ? "var(--color-blue-700)" : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {(profileinfo.role == "teacher" || profileinfo.role == "admin") && (
          <Link to={`/home/Classes`} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleactive("Classes")}>
                <ListItemIcon>
                  <SiGoogleclassroom size="25px" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    profileinfo.role == "teacher" || profileinfo.role == "admin"
                      ? t("manage_classes")
                      : t("classes")
                  }
                  sx={{
                    color: active === "Classes" ? "var(--color-blue-700)" : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <Link to={`/home/schoollist`} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleactive("schoollist")}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("school_list")}
                sx={{
                  color: active === "schoollist" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to={`/home/classlist`} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleactive("classlist")}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("classes")}
                sx={{
                  color: active === "classlist" ? "var(--color-blue-700)" : "",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {profileinfo.role == "parent" && (
          <Link to={`/home/children`} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleactive("children")}>
                <ListItemIcon>
                  <FamilyRestroomIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("manage_children")}
                  sx={{
                    color: active === "children" ? "var(--color-blue-700)" : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <Divider />

        <Link to={`/home/bookmarks`} style={{ textDecoration: "none" }}>
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
      </List>
    </Drawer>
  );
}

export default HomeDrawer;
