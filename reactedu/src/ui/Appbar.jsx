import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grow,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import * as React from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ButtonGroup from "@mui/material/ButtonGroup";
import Notification from "./Notification";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { IoIosChatbubbles } from "react-icons/io";
import Chaticon from "../assets/icons/Chaticon";
import Notificationicon from "../assets/icons/Notificationicon";
import Logout from "@mui/icons-material/Logout";
import { useStateContext } from "../context/ContextProvider";
import MenuLanguage from "../utlis/MenuLanguage";
import { useTranslation } from "react-i18next";
import ChangeLanguageIcon from "../assets/icons/ChangeLanguageIcon";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";

function Appbar({ drawerWidth, funshowdrawer, handleditinfo, closeeditinfo }) {
  const [notif, setnotifi] = useState(false);
  const { user, token, setUser, setToken, setprofileinfo } = useStateContext();
  const [openlanguage, setOpenlanguage] = React.useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { profileinfo } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showadditon, setshowadditon] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("UserInfo");
    localStorage.removeItem("profileinfo");
    setToken(null);
    setUser(null);
    setprofileinfo(null);
    console.log("logout");
  };
  const handleadditional = () => {
    setshowadditon(!showadditon);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: isArabic ? { xs: 0 } : { xs: 0, sm: `${drawerWidth}px` },
          marginRight: isArabic ? { xs: 0, sm: `${drawerWidth}px` } : { xs: 0 },
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", sm: "space-between" },
          }}
        >
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => {
              funshowdrawer();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box>{drawerWidth === 0 && <img src="../../public/logo.png" alt="Logo" />}</Box>
          <Box sx={{ display: { xs: "flex" } }}>
            <MenuLanguage />
            {profileinfo.is_verified && (
              <>
                <IconButton size="large" aria-label="show 4 new mails" color="black">
                  <Badge badgeContent={4} color="error">
                    <div
                      style={{
                        backgroundColor: "#E9E9E9",
                        padding: "12px 12px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Chaticon />
                    </div>
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="black"
                  onClick={() => {
                    setnotifi(!notif);
                  }}
                >
                  <Badge
                    color="error"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#E9E9E9",
                        padding: "12px 12px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Notificationicon />
                    </div>
                  </Badge>
                </IconButton>
              </>
            )}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 0 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt={`${profileinfo?.first_name} ${profileinfo?.last_name}`}
                  src={profileinfo?.profile_picture ? profileinfo.profile_picture : ""}
                ></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {profileinfo.is_verified && [
                <MenuItem key="profile" onClick={handleClose}>
                  <Avatar /> {profileinfo?.first_name} {profileinfo?.last_name}
                </MenuItem>,
                <MenuItem key="settings" onClick={handleadditional}>
                  <Settings />
                  <span style={{ marginLeft: "10px" }}>{t("manage_profile")}</span>
                </MenuItem>,
                <MenuItem key="edit-info" onClick={handleditinfo}>
                  <ListItemIcon>
                    <IoInformationCircleOutline size={25} />
                  </ListItemIcon>
                  {t("edit_information")}
                </MenuItem>,
                <MenuItem key="change-password" onClick={handleClose}>
                  <ListItemIcon>
                    <MdChangeCircle size={25} />
                  </ListItemIcon>
                  {t("change_password")}
                </MenuItem>,
              ]}
              <Divider />
              <MenuItem key="logout" onClick={handlelogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                {t("logout")}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {notif && <Notification />}
    </>
  );
}

export default Appbar;
