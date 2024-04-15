
import { Avatar } from "@mui/material"

import IconButton from '@mui/material/IconButton';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import  { useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Reply from "./Reply";
function Comment({comment}) {
    const [replies, setreplies] = useState(false);
    const [reply,setreply] = useState(false);
    // you have tho provide the name of the user who is replying to the comment
    const firstname="Bareche";
    function showReplies(){
        if(comment.replies &&comment.replies.length){
            setreplies(!replies);
        }
        return;
    }
    function showreply(){
        setreply(!reply);
    }

    return (
       
        <div>
            <div style={{display:'flex',alignItems:'center', gap:'5px'}}>
             
             <Avatar
           
              alt="Remy Sharp"
             src="/broken-image.jpg"
             >
            {comment.first_name[0]}
           </Avatar>

              <div>
               <span style={{fontSize:'14px',fontWeight:'bold',marginRight:'5px'}}>{comment.first_name}:</span>
               <span>{comment.text} </span>
               </div>
             </div>
             <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>  
                <IconButton sx ={{marginLeft:'15px'}} onClick={()=>showReplies(comment.replies)}>
                    <SubdirectoryArrowRightIcon/>
                    <span style={{fontSize:'11px',color:'#212121'}}> Replay comments{comment.replies &&comment.replies.length} </span>    
                </IconButton>

                <div>
                <IconButton onClick={()=>showreply()}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                    <span style={{fontSize:'11px',color:'#212121'}}> reply {comment.comments_count} </span>

                </div>
                
               <div>
                <IconButton >
                    <ThumbUpOffAltIcon/>
                    </IconButton>
                    <span style={{fontSize:'11px',color:'#212121'}}> like {comment.likes_count} </span>    
              
                </div>
             </div>

             <div style={{marginLeft:'15px'}}>{ reply && <Reply first_name={firstname}/> }</div>
             <div  style={{marginLeft:'15px'}}>
                {replies && comment.replies.map((reply) => (
                    <Comment key={reply.id} comment={reply} />
                ))}
             </div>
        </div>
    )
}

export default Comment
