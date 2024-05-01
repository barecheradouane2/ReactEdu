import { Container, Typography } from "@mui/material"
import Box from '@mui/material/Box';
function Body({drawerWidth,children}) {
    return (
        <Box sx={{
             ml:`${drawerWidth}px`,px:'25px',py:'23px',
           
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-around',
            
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { xs: 0, sm: `${drawerWidth}px` },
        //   marginTop: '50px',
           }}>
            {children}
            
            </Box>
        
    )
}

export default Body
