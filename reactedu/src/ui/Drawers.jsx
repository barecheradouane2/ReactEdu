// import { Toolbar, Typography } from "@mui/material"
import { Divider, Drawer } from "@mui/material"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput";


function Drawers({drawerWidth,showdrawer,drawertype,funclosedrawer}) {

  let { schoolname } = useParams();
// Decode the schoolname from URI
  schoolname = decodeURIComponent(schoolname);

  const handleSearch = (searchText) => {
    // Implement your search logic here using the searchText
    console.log('Searching for:', searchText);
  };

    return (
        <Drawer
        sx={{
          display : {xs:`${showdrawer}`,sm:'block'},
          width: `${drawerWidth}px`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: `${drawerWidth}px`,
            boxSizing: 'border-box',
          },
        }}
        variant= {drawertype}
        anchor="left"
        open={true}
        onClose={() => { funclosedrawer();}}
      >
             {/* <Typography variant="h6" noWrap sx={{color:'#4385F5',textAlign:'center',mt:'30px'}}>   <SchoolIcon />EduConnect</Typography> */}

             <div><img src="../../public/logo.png" alt="" /></div>

        {/* <Toolbar /> */}
        {/* <Divider /> */}
        <SearchInput onSearch={handleSearch} />
        
        <List>

        <Link to="/schools" style={{textDecoration:'none'}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          </Link>
       
          <Link to={`/schools/${schoolname}`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="School" />
            </ListItemButton>
          </ListItem>

          </Link>

          <Link to={`/schools/${schoolname}/classes`}  style={{textDecoration:'none'}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
          </ListItem>
          </Link>

        <Link to={`/schools/${schoolname}/friends`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>

          </Link>

          <Link to={`/schools/${schoolname}/bookmarks`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkAddIcon />
              </ListItemIcon>
              <ListItemText primary="BookMarks" />
            </ListItemButton>
          </ListItem>

          </Link>

          <Divider />

          <Link to={`/schools/${schoolname}/addchild`}  style={{textDecoration:'none'}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Child" />
            </ListItemButton>
          </ListItem>
          </Link>
 
          <Link to={`/schools/${schoolname}/children`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EscalatorWarningIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Children" />
            </ListItemButton>
          </ListItem>

          </Link>

          <Link to={`/schools/${schoolname}/calender`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Calender" />
            </ListItemButton>
          </ListItem>

          </Link>
          <Link to={`/schools/${schoolname}/events`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem>

          </Link>

          <Link to={`/schools/${schoolname}/settings`}  style={{textDecoration:'none'}}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          </Link>

          


        </List>
       
      </Drawer>
    )
}

export default Drawers;
