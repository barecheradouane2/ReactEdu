import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
import Logout from "@mui/icons-material/Logout";
import { useStateContext } from "../context/ContextProvider";
function Appbar({ drawerWidth, funshowdrawer }) {
  const [notif, setnotifi] = useState(false);
  const { user } = useStateContext();
  console.log(user);

  const notification = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      message: "john he want to join the school",
    },
    {
      id: 2,
      first_name: "wassim",
      last_name: "hamdi",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptatem.",
    },
    {
      id: 3,
      first_name: "anis",
      last_name: "nejoah",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptatem.",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { xs: 0, sm: `${drawerWidth}px` },

          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Toolbar>
          {/* <Typography variant="h6" component="div" >
            News
          </Typography> */}

          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => {
              funshowdrawer();
            }}
          >
            <MenuIcon />
          </IconButton>

          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            <Button>Explore</Button>
            <Button>Class Feed</Button>
            <Button>School Feed</Button>
          </ButtonGroup>

          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="black"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
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
              <Badge badgeContent={notification.length} color="error">
                <NotificationsIcon sx={{}} />
              </Badge>
            </IconButton>

            <Typography
              variant="h8"
              sx={{ mt: "10px", ml: "12px", mr: "8px", color: "black" }}
            >
               
            </Typography>
            {/* <Avatar
            sx={{ bgcolor: deepOrange[500] }}
              alt="Remy Sharp"
             src="/broken-image.jpg"
             >
            B
           </Avatar> */}

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
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                
                </Avatar>
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
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {notif && <Notification notification={notification} />}
    </>
  );
}

export default Appbar;
