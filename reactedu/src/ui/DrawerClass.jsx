import { Divider, Drawer } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import Classes from "./Classes";
import IconButton from "@mui/material/IconButton";

import { useParams } from "react-router-dom";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import SettingsIcon from "@mui/icons-material/Settings";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import { LeaveClass } from "../services/apiClass";
import { useTranslation } from "react-i18next";
import { useStateContext } from "../context/ContextProvider";

function DrawerClass({
  school_id,
  class_id,
  classinfo,
  drawerWidth,
  showdrawer,
  drawertype,
  funclosedrawer,
}) {
  let { schoolname, classname } = useParams();

  classname = decodeURIComponent(classname);

  const handleSearch = (searchText) => {
    // Implement your search logic here using the searchText
    console.log("Searching for:", searchText);
  };

  const [active, setActive] = useState("Class");
  const Navigate = useNavigate();
  function handleactive(params) {
    setActive(params);
  }

  const classes = [
    {
      id: 1,
      url: "/Classroom-Procedures-min 1 (1).png",
    },
    {
      id: 2,
      url: "/cropped_school-classroom-1-3-scaled 1.png",
    },
    {
      id: 3,
      url: "/pexels-james-wheeler-417074 1.png",
    },
    {
      id: 4,
      url: "/Group 26.png",
    },
    {
      id: 5,
      url: "/businessfornature-banner 1.png",
    },
  ];

  const { t } = useTranslation();

  function leaveClass() {
    console.log("leave class");
    LeaveClass(school_id);
    Navigate("/classes");
  }

  const { profileinfo } = useStateContext();

  const isClassAdmin = profileinfo?.owned_classes?.find(
    (cls) => cls.id === class_id
  )
    ? true
    : false;

  return (
    <Drawer
      sx={{
        display: { xs: `${showdrawer}`, sm: "block" },
        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
          backgroundColor: "transparent",
        },
      }}
      variant={drawertype}
      anchor="left"
      open={true}
      onClose={() => {
        funclosedrawer();
      }}
    >
      <div>
        <img src="/logo.png" alt="" />
      </div>

      <div className=" flex flex-row  justify-around  gap-1">
        <div className=" flex flex-col gap-5 mt-4">
          {classes.map((cls) => (
            <Classes key={cls.id} cls={cls} />
          ))}

          <button
            className="rounded-full"
            style={{
              width: "45px",
              height: "45px",
              color: "#4385F5",
              border: "1px solid #eee",
              backgroundColor: "white",
            }}
          >
            +
          </button>
        </div>

        <div className=" flex flex-col gap-1">
          <div className=" divgroup flex bg-white px-3 py-3 justify-between	  rounded-lg">
            <div>
              <span>{classinfo[0].name}</span>
              <p style={{ color: "#4385F5" }}>{classinfo[0].members_count} </p>
            </div>

            <IconButton onClick={() => leaveClass()}>
              {" "}
              <LoginOutlinedIcon />
            </IconButton>
          </div>

          <button
            className="rounded-full flex gap-1   "
            style={{
              backgroundColor: "#4385F5",
              color: "white",
              padding: "5px 30px",
              margin: "5px 0px",
            }}
          >
            <PersonAddAlt1OutlinedIcon />
            {t("invite_users")}
          </button>
          <div>
            <span>{t("code")}</span>{" "}
            <span style={{ color: "#4385F5" }}>{classinfo[0].code}</span>
          </div>
          <p style={{ fontSize: "13px" }}>{t("browse")}</p>
          <List>
            <Link to="/home/schools" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("home")} />
                </ListItemButton>
              </ListItem>
            </Link>
            {classinfo[0].school_id != null && (
              <Link
                to={`/home/schools/${schoolname}`}
                state={{ school_id: school_id }}
                style={{ textDecoration: "none" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="School" />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            <Link
              to={`/home/schools/${schoolname}/classes/${classname}`}
              state={{ school_id: school_id, class_id: class_id }}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleactive("Class")}>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("class")}
                    sx={{
                      color: active === "Class" ? "var(--color-blue-700)" : "",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>

            {isClassAdmin && (
              <Link
                to={`/home/schools/${schoolname}/classes/${classname}/Members`}
                state={{ school_id: school_id, class_id: class_id }}
                style={{ textDecoration: "none" }}
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleactive("Members")}>
                    <ListItemIcon>
                      <Diversity3Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={t("members")}
                      sx={{
                        color:
                          active === "Members" ? "var(--color-blue-700)" : "",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}

            {profileinfo.role == "parent" && (
              <Link
                to={`/home/schools/${schoolname}/classes/${classname}/Associate`}
                state={{ school_id: school_id, class_id: class_id }}
                style={{ textDecoration: "none" }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleactive("ManageChildren")}
                  >
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
          </List>

          <p style={{ fontSize: "13px" }}>{t("acces")}</p>

          {isClassAdmin && (
            <Link
              to={`/home/schools/${schoolname}/classes/${classname}/joinrequests`}
              state={{ school_id: school_id, class_id: class_id }}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleactive("joinrequests")}>
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("class_requests")}
                    sx={{
                      color:
                        active === "joinrequests"
                          ? "var(--color-blue-700)"
                          : "",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          <List>
            {/* <Link
              to={`/home/schools/${schoolname}/classes/${classname}/settings`}
              state={{ school_id: school_id , class_id : class_id}}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleactive("Settings")}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    sx={{
                      color:
                        active === "Settings" ? "var(--color-blue-700)" : "",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link> */}
          </List>
        </div>
      </div>
    </Drawer>
  );
}

export default DrawerClass;
