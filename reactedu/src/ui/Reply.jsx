import { IconButton } from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";

import { CreateComment } from "../services/apiComment";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loading from "../utlis/Loading";
import Share from "../assets/icons/Share";
import { CreateReply } from "../services/apiComment";

import { useRef } from "react";

function Reply({ id, first_name, type }) {
  // const { isLoading, data: comments } = useQuery(["comment"], CreateComment);

  const queryClient = useQueryClient();
  const textRef = useRef();

  const { mutate: createcomment, isLoading } = useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      queryClient.invalidateQueries("posts");
      toast.success("Comment Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: createreply, isLoading: isLoadingReply } = useMutation({
    mutationFn: CreateReply,
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      queryClient.invalidateQueries("posts");
      toast.success("Reply Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleAddComment() {
    const payload = {
      id: id,
      text: textRef.current.value,
    };

    createcomment(payload);
  }
  function handleAddReply() {
    const payload = {
      id: id,
      text: `@${first_name.charAt(0).toUpperCase()+first_name.slice(1)}`+" "+textRef.current.value,
    };

    createreply(payload);
  }
  function handlesubmit(){
    if(type==="comment"){
      handleAddComment();
    }else{
      handleAddReply();
    }
  }

  if (isLoading) return <Loading />;
  if (isLoadingReply) return <Loading />;

  return (
    <div
      className="createcomments"
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px 0px",
        padding: "5px 0px",
        gap: "5px",
      }}
    >
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
        ml="10px"
      >
        {first_name[0].toUpperCase()}
      </Avatar>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          backgroundColor: "#F6F6F6",
          justifyContent: "space-between",
          flexGrow: "1",
          height: "40px",
          borderRadius: "20px",
        }}
      >
        <input
          type="text"
          placeholder="write a comment"
          ref={textRef}
          style={{
            backgroundColor: "#F6F6F6",
            border: "none",
            outline: "none",

            borderRadius: "20px",
            height: "100%",
            width: "100%",
          }}
        />
        {/* <IconButton>
          <CropOriginalIcon />
        </IconButton> */}
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton
          onClick={() => handlesubmit()}
          sx={{ marginRight: "10px" }}
        >
          <Share />
        </IconButton>
      </div>
    </div>
  );
}

export default Reply;
