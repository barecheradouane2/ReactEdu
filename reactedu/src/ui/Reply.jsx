
import {  IconButton } from "@mui/material"
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
function Reply({first_name }) {
    return (
    <div className='createcomments' style={{display:'flex',alignItems:'center',
          
        padding:'5px 0px',
        gap:'5px',
           }}>

        <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                    ml='10px'
                    >
                   {first_name[0] }
                   </Avatar>
        <div  style={{display:'flex',alignItems:'start',backgroundColor:'#F6F6F6',justifyContent:'space-between',
        flexGrow:'1',
        height:'40px',
         borderRadius:'20px',
         
         }}>

          <input type="text" placeholder="write a comment" style={{backgroundColor:'#F6F6F6',border:'none',outline:'none',
        
          borderRadius:'20px',
           height:'100%',
           width:'100%',
          
          }}/>
          <IconButton><CropOriginalIcon/></IconButton>
             <IconButton><InsertEmoticonIcon/></IconButton>
          </div>

     </div>
    )
}

export default Reply
