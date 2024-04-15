
import DemoPaper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchSchool({toggleSearchPopup}) {
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
                backgroundColor:'#f50057',
                ":hover":{  backgroundColor:'#ff5983'}
            }}
            onClick={toggleSearchPopup}
            ><SearchOutlinedIcon/></Button>
            <Typography>JOIN SCHOOL</Typography>
            
            
            </DemoPaper>
    )
}

export default SearchSchool
