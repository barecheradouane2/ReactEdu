
import {Box, IconButton} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Comment from './Comment';
function CommentList({comments}) {
    return (
        <Box sx={{marginTop:'15px'}}>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'11px',color:'#212121'}}>All Comments <IconButton><KeyboardArrowDownIcon/></IconButton></span>
              <Box>
                <span style={{fontSize:'11px',color:'#212121',marginRight:'5px'}}>Sort by</span>
              <span style={{fontSize:'11px',color:'#212121',fontWeight:'bold'}}>Most Popular</span>
              </Box>
         
            </Box>

            <Box>
  
            
            {comments.map((comment)=>(
                 
             <Comment key={comment.id} comment={comment}/>

             ))}
            </Box>


        </Box>
    )
}

export default CommentList
