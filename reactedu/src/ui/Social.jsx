import Posts from "./Posts"

//import Grid from '@mui/material/Grid';
import Contacts from "./Contacts";
import Box from '@mui/material/Box';

function Social({drawerWidth}) {
    return (
      //  <Body drawerWidth={drawerWidth} >
           <Box sx={{display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-around',}}>  
        <Posts/>
        <Contacts/>
        </Box> 
      // </Body>

  
    )
}

export default Social
