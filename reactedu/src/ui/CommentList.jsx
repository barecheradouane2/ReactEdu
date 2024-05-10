
import {Box, IconButton} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Comment from './Comment';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '../services/apiComment';
function CommentList({id}) {

  
  const { data: comments,isLoading } = useQuery(["comments", id], () => getComments(id));
  if(isLoading){
    return <div>Loading...</div>
  }
  

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
  
            
            {comments.data.map((comment)=>(
                 
             <Comment key={comment.id} comment={comment}  type={"comment"}/>

             ))}
            </Box>


        </Box>
    )
}

export default CommentList
