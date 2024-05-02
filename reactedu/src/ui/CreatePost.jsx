// import ImageIcon from "@mui/icons-material/Image";
import Imageicon from "../assets/icons/Imageicon";

import Calendericon from "../assets/icons/Calendericon";
import Sendicon from "../assets/icons/Sendicon";
import Pollicon from "../assets/icons/Pollicon";

import Videoicon from "../assets/icons/Videoicon";

// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import SendIcon from "@mui/icons-material/Send";
import ImageUploadButton from "./ImageUploadButton";
import VideoUploadButton from "./VideoUploadButton";
import FileUploadButton from "./FileUploadButton";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Box } from "@mui/material";
import Iconbutton from "@mui/material/IconButton";
// import Event from "./Event";
// import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostAdmin } from "../services/apiPosts";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function CreatePost() {
  
  const [imgfile, setimgfile] = useState([]);
  const [videofile, setvideofile] = useState([]);
  const [attachment, setattachment] = useState([]);
  const [poll, setpoll] = useState([]);

 

  //the problem with ressource
  const [ressource, setressource] = useState([]);
  const [posttype, setposttype] = useState("text");

  const location = useLocation();

  const { school_id } = location.state;

  const text = useRef(null);
  const files = useRef(null);

  function handleimg() {
    const updatedImgfile = imgfile.filter((img) =>
      ressource.some((res) => res.id === img.id)
    );

    setimgfile(updatedImgfile);
  }

  function handlevideo() {
    const updatedVideofile = videofile.filter((video) =>
      ressource.some((res) => res.id === video.id)
    );

    // Update the state with the filtered videofile
    setvideofile(updatedVideofile);
  }

  const queryClient = useQueryClient();
  const { mutate: createpostadmin, isLoading } = useMutation({
    mutationFn: CreatePostAdmin,
    onSuccess: (data) => {
      toast.success("post created successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("userData");
    },
    onError: () => {
      toast.error("Error  of creating post");
    },
  });

  function handlesubmit() {
    const formData = new FormData();
    // ressource.forEach((res) => {
    //   if (res.type === "img") {
    //     formData.append("picture[]", "picture");
    //   } else if (res.type === "vid") {
    //     formData.append("video[]", "video");
    //   }else{

    //   }
    // });
    // attachment.forEach((file) => {
    //   formData.append("attachment[]", file);
    // });

    formData.append("type", "text");
    // formData.append("type", "video");
    // formData.append("type", "picture");
    // formData.append("type", "poll");
    // formData.append("type", "attachment");

    formData.append("text", text.current.value);
    formData.append("school_id", school_id);
    createpostadmin(formData);
  }

  const slicedRessource =
    ressource.length > 4 ? ressource.slice(0, 3) : ressource;
  return (
    <Box sx={{}}>
      <Box sx={{}}>
        <Box
          sx={{
            py: "15px",
            px: "15px",
            backgroundColor: "white",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "" }}>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            >
              B
            </Avatar>
            {/* <input
              type="text"
              name=""
              id=""
              placeholder="write something...🖊"
              style={{ border: "none", outline: "none", background: "none" }}
            /> */}
            <textarea
              ref={text}
              placeholder="write something...🖊"
              style={{
                border: "none",
                outline: "none",
                background: "none",
                width: "100%",
                resize: "none",
                paddingLeft: "10px",
                fontSize: "16px",
                fontFamily: "inherit",
                marginTop: "10px",
                overflow: "hidden",
              }}
            ></textarea>
          </Box>
          <Box
            className="ressource"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Responsive grid with minimum width of 200px
              gridGap: "10px", // Spacing between grid items
              // border: "1px solid #ccc",
              // padding: "10px",
              borderRadius: "5px",
            }}
          >
            {/* {slicedRessource.map((res, index) => {
              if (res.type === "img") {
                return (
                  <div key={index} style={{ position: "relative" }}>
                    <Iconbutton
                      onClick={() => {
                        setressource((prevRessource) =>
                          prevRessource.filter((_, i) => i !== index)
                        );
                        handleimg();
                      }}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        zIndex: "100",
                      }}
                    >
                      <CancelIcon />
                    </Iconbutton>
                    <img
                      src={res.url} // Assuming `url` is the property that holds the image URL
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              } else if (res.type === "vid") {
                return (
                  <div key={index} style={{ position: "relative" }}>
                    <Iconbutton
                      onClick={() => {
                        setressource((prevRessource) =>
                          prevRessource.filter((_, i) => i !== index)
                        );
                        handlevideo();
                      }}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        zIndex: "100",
                      }}
                    >
                      <CancelIcon />
                    </Iconbutton>
                    <video controls width="100%" height="200px">
                      <source src={res.url} type="video/mp4" />
                    </video>
                  </div>
                );
              } else if (res.type === "file") {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      position: "relative",
                    }}
                  >
                    <img
                      width="50px"
                      height="50px"
                      src="../../public/file-blank-solid-240.png"
                    />
                    <span>{res.url}</span>

                    <Iconbutton
                      onClick={() => {
                        setattachment((prevAttachments) =>
                          prevAttachments.filter((_, i) => i !== index)
                        );
                      }}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <CancelIcon />
                    </Iconbutton>
                  </div>
                );
              }
            })}
            {ressource.length > 4 && (
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Iconbutton
                    onClick={() => {
                      const updatedRessource = ressource.slice(0, -1);
                      // Update the state with the new array
                      setressource(updatedRessource);
                    }}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      zIndex: "100",
                    }}
                  >
                    <CancelIcon />
                  </Iconbutton>
                  <h1 style={{ fontSize: "24px" }}>
                    {ressource.length - 3} more
                  </h1>
                </div>
              </div>
            )} */}

           
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            backgroundColor: "#D2F0FF",
            pl: "15px",
          }}
        >
          <ImageUploadButton
            setressource={setressource}
            setimgfile={setimgfile}
            setposttype={setposttype}
            ressource={ressource}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* <ImageIcon sx={{ color: "#666666" }} /> */}
            <Imageicon />
            Photos
          </ImageUploadButton>
          <VideoUploadButton
            setvideofile={setvideofile}
            setressource={setressource}
            setposttype={setposttype}
            ressource={ressource}
          >
            <Videoicon />
            Video
          </VideoUploadButton>
          <ImageUploadButton>
            {/* <EditCalendarIcon /> */}
            <Calendericon />
            Attachement
          </ImageUploadButton>
          <FileUploadButton
            setattachment={setattachment}
            ressource={ressource}
            setressource={setressource}
            setposttype={setposttype}
          >
            {/* <PollIcon /> */}
            <Pollicon />
            Polla
          </FileUploadButton>
          {/* <button  style={{color:'#666666',backgroundColor:'#A1E1FF',flexGrow:'1'}}  > </button> */}
          <button
            style={{
              color: "#666666",
              flexGrow: 1,
              backgroundColor: "#A1E1FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
            }}
            onClick={() => handlesubmit()}
            className="buttonfile"
          >
            {/* <SendIcon /> */}
            <Sendicon />
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePost;


