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
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

function DrawerClass({ drawerWidth, showdrawer, drawertype, funclosedrawer }) {
  let { schoolname, classname } = useParams();

  classname = decodeURIComponent(classname);

  const handleSearch = (searchText) => {
    // Implement your search logic here using the searchText
    console.log("Searching for:", searchText);
  };

  const classes = [
    {
      id: 1,
      url: "../../public/Classroom-Procedures-min 1 (1).png",
    },
    {
      id: 2,
      url: "../../public/cropped_school-classroom-1-3-scaled 1.png",
    },
    {
      id: 3,
      url: "../../public/pexels-james-wheeler-417074 1.png",
    },
    {
      id: 4,
      url: "../../public/Group 26.png",
    },
    {
      id: 5,
      url: "../../public/businessfornature-banner 1.png",
    },
  ];
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
        <img src="../../public/logo.png" alt="" />
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
              <span>{classname}</span>
              <p style={{ color: "#4385F5" }}>26 </p>
            </div>

            <IconButton>
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
            Save Changes
          </button>
          <div>
            <span>Code :</span>{" "}
            <span style={{ color: "#4385F5" }}>{classname}</span>
          </div>
          <p style={{fontSize:'13px'}}>Browse</p>
          <List>
            <Link to="/schools" style={{ textDecoration: "none" }} 
            
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to={`/schools/${schoolname}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DescriptionOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Attachement" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/schools/${schoolname}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BarChartOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Polls" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/schools/${schoolname}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EventOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to={`/schools/${schoolname}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EventOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Class Schedule" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          
          <p style={{fontSize:'13px'}}>Acces</p>
          <List>
            <Link to="/schools" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <PersonOutlinedIcon>
                    <HomeIcon />
                  </PersonOutlinedIcon>
                  <ListItemText primary="Student Report" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/schools" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ChatBubbleOutlineOutlinedIcon>
                    <HomeIcon />
                  </ChatBubbleOutlineOutlinedIcon>
                  <ListItemText primary="Chat" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/schools" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <SettingsOutlinedIcon>
                    <HomeIcon />
                  </SettingsOutlinedIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </div>
      </div>
    </Drawer>
  );
}

export default DrawerClass;
