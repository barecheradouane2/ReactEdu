
import DemoPaper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { FaSchoolLock } from "react-icons/fa6";
import { CiBarcode } from "react-icons/ci";
import { useTranslation } from 'react-i18next';


function SearchSchool({toggleSearchPopup,children,type}) {
    const {t}=useTranslation();
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
                backgroundColor: `${type === 'nocode' ? '#cd512d' : '#616d58'}`,
                 ":hover":{   backgroundColor: `${type === 'nocode' ? '#cd512d' : '#616d58'}`}
            }}
            onClick={toggleSearchPopup}
            >
             {type=='code' ? <CiBarcode/> : <FaSchoolLock /> }   
            </Button>
            <Typography>{children}</Typography>
            
            
            </DemoPaper>
    )
}

export default SearchSchool
