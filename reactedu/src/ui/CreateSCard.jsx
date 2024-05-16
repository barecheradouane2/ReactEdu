
import DemoPaper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
function CreateSCard({funcshowCreatePopup,type}) {
    return (
        <DemoPaper variant="elevation"  sx={
            {padding:'10px',height:'220px',display:'flex'
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
            <Typography>{type!='Class'?"Create School/Class":" Create Class"}</Typography>
            
            
            </DemoPaper>
        
    )
}

export default CreateSCard
