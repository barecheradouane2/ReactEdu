
import DemoPaper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
function CreateSCard({funcshowCreatePopup}) {
    return (
        <DemoPaper variant="elevation"  sx={
            {padding:'10px',height:'200px',display:'flex'
            ,flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'10px'
        }
            }>
            <Button variant="contained" 
            sx={{
                width:'70px',
                height:'70px',
                borderRadius:'50%',
                fontSize:'30px',
            }}
            onClick={funcshowCreatePopup}
            >+</Button>
            <Typography>Create School/Class</Typography>
            
            
            </DemoPaper>
        
    )
}

export default CreateSCard
