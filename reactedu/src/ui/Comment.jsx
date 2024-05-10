import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { useState } from "react";
import Reply from "./Reply";
import { deepOrange } from "@mui/material/colors";
import Comments from "../assets/icons/Comments";
import Like from "../assets/icons/Like";
import Likecover from "../assets/icons/Likecover";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import {LikeComment} from "../services/apiPosts";
import { LikeReply } from "../services/apiPosts";


function Comment({ comment, type }) {

  const queryClient = useQueryClient();
  const [replies, setreplies] = useState(false);
  const [reply, setreply] = useState(false);

  const [like, setlike] = useState(comment.isLiked);

  // you have tho provide the name of the user who is replying to the comment
  const firstname = comment.first_name;
  function showReplies() {
    if (comment.replies && comment.replies.length) {
      setreplies(!replies);
    }
    return;
  }
  function showreply() {
    setreply(!reply);
  }

 

  const { mutate: likeco, isLoading:loadinglikecomment } = useMutation({
    mutationFn: LikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      setlike(!like);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: likerp, isLoading:loadinglikeReply } = useMutation({
    mutationFn: LikeReply,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      setlike(!like);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handlelike() {
    if(type === "comment"){
      likeco({ id: comment.id });
    }else{
      likerp({ id: comment.id });
    }
  } 
  // if(loadinglikecomment || loadinglikeReply){
  //   return <div>Loading...</div>
  // }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          
          {comment.first_name[0].toUpperCase()}
        </Avatar>

        <div>
          <span
            style={{ fontSize: "14px", fontWeight: "bold", marginRight: "5px" }}
          >
            
            {comment.first_name.charAt(0).toUpperCase() +
              comment.first_name.slice(1)}
            :
          </span>
          <span style={{ fontSize: "13px" }}>
          <span style={{fontWeight:'bold'}}>{comment.text.substring(comment.text.indexOf("@"),  comment.text.indexOf(" ") + 1)}</span>

            {comment.text.substring(comment.text.indexOf(" ") + 1)}
            
             </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {type === "comment" && (
          <>
            <div>
              <IconButton
                sx={{ marginLeft: "15px" }}
                onClick={() => showReplies(comment.replies)}
              >
                <SubdirectoryArrowRightIcon />
              </IconButton>

              <span style={{ fontSize: "11px", color: "#212121" }}>
                {" "}
                Replay Comments
                {comment.replies && (
                  <span
                    style={{
                      marginleft: "15px",
                      backgroundColor: "#eee",
                      padding: "3px 9px",
                      borderRadius: "70%",
                    }}
                  >
                    {comment.replies.length}
                  </span>
                )}{" "}
              </span>
            </div>

            <div>
              <IconButton onClick={() => showreply()}>
                <Comments />
              </IconButton>
              <span style={{ fontSize: "11px", color: "#212121" }}>
                {" "}
                Reply {comment.comments_count}{" "}
              </span>
            </div>
          </>
        )}

        <div style={type != "comment" ? {  flexGrow:1, display: "flex", justifyContent: "flex-end",alignItems:"center"  } : {}}>
          <IconButton onClick={handlelike}>
           {like==true ? <Likecover /> :<Like />} 
          </IconButton>
          <span style={{ fontSize: "11px", color: "#212121" }}>
            {" "}
            Like {comment.likes_count}{" "}
          </span>
        </div>
      </div>

      <div style={{ marginLeft: "15px" }}>
        {reply && (
          <Reply id={comment.id} first_name={firstname} type={"reply"} />
        )}
      </div>
      <div style={{ marginLeft: "15px" }}>
        {replies &&
          comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} type={"reply"} />
          ))}
      </div>
    </div>
  );
}

export default Comment;
