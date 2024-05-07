import { IconButton } from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
 
import {CreateComment} from "../services/apiComment";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loading from "../utlis/Loading";

function Reply({ first_name }) {

  // const { isLoading, data: comments } = useQuery(["comment"], CreateComment);

  const queryClient = useQueryClient();

  const { isLoading,mutate:create } = useMutation({
    mutationFn: CreateComment ,
    onSuccess: () => {
      queryClient.invalidateQueries("comment");
      queryClient.invalidateQueries("posts");
      toast.success("Comment Created Successfully");
    },
  });

  if(isLoading) return <Loading />;







   
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
          style={{
            backgroundColor: "#F6F6F6",
            border: "none",
            outline: "none",

            borderRadius: "20px",
            height: "100%",
            width: "100%",
          }}
        />
        <IconButton>
          <CropOriginalIcon />
        </IconButton>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Reply;
