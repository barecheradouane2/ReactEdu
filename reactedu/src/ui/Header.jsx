import { AppBar } from "@mui/material"
import {Toolbar} from "@mui/material"
import {Typography} from "@mui/material"  
import { styled } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Link from '@mui/material/Link';  
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import MapsUgcIcon from '@mui/icons-material/MapsUgc';
const MyTypography = styled(Typography)({
    flexGrow: 1,
  });

  const MyAvatar = styled(Avatar)({
    backgroundColor: "orange[500]",
    marginLeft: "10px",
  });


function Header() {
   
    return (
        <AppBar sx={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>

          <Link href=""  variant="h6" sx={{flexGrow:1,textDecoration:'none'}}> EduConnect</Link>
            {/* <MyTypography variant="h6">
             EduConnect
            </MyTypography> */}
           
            <EmailOutlinedIcon />
            <NotificationsNoneOutlinedIcon />
            <Typography variant="body1" color={"inherit"}>Bareche Radouane</Typography>
            <MyAvatar >B </MyAvatar>


          </Toolbar>
        </AppBar>
      );
}

export default Header
