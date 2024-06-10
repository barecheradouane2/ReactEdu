
import DemoPaper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function CreateSCard({funcshowCreatePopup,type}) {
    const {t} = useTranslation();
    console.log(t('create_school'));


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
             {/* <Typography>{type !== 'Class' ? {t('create_school')} : 'Create Class'}</Typography> */}

          { type !== 'Class'&& <Typography>{t('create_school')}</Typography>} 
          { type == 'Class'&& <Typography>{t('create_class')}</Typography>} 
            
            
            </DemoPaper>
        
    )
}

export default CreateSCard
