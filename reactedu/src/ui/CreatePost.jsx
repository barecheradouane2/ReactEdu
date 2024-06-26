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
import { useTranslation } from "react-i18next";

function CreatePost() {
  const{t}=useTranslation();
  const [imgfile, setimgfile] = useState([]);
  const [videofile, setvideofile] = useState([]);
  const [attachment, setattachment] = useState([]);
  const [poll, setpoll] = useState([]);
  const [posttype, setposttype] = useState("text");

  //this array contains all the ressource image or video or attachements or polls (not yet)
  const [ressource, setressource] = useState([]);
  //this is the array that contains the ressource that will be show temporary to the page
  let preressource = ressource.flatMap((item) => {
    if (item.type == "file") return item;
    return Array.from(item.url).map((file) => {
      const url = URL.createObjectURL(file);
      return { type: item.type, url: url };
    });
  });

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

   

    switch (posttype) {
      case "img":
        formData.append("type", "picture");

        ressource.forEach((img, index) => {
          formData.append(`picture[${index}]`, img.url[0]);
        });
        break;
      case "vid":
        formData.append("type", "video");
        ressource.forEach((vi, index) => {
          formData.append(`video[${index}]`, vi.url[0]);
        });
        break;
      case "file":
        formData.append("type", "attachment");
        ressource.forEach((file, index) => {
          console.log(file);
          formData.append(`attachment[${index}]`, file.url);
      });
        break;

        case "poll":  
        formData.append("type", "poll");

        break;

      default:
        formData.append("type", "text");
        break;

      
       
    }

    // if (ressource.length === 0) {
    //   formData.append("type", "text");

    // }

    formData.append("text", text.current.value);
    formData.append("school_id", school_id);
    console.log([...formData.entries()]);

    createpostadmin(formData);
  }
  //this is the new array for fixing if there are number of age more then or equal four
  const slicedRessource =
    preressource.length > 4 ? preressource.slice(0, 3) : preressource;

  return (
    <Box sx={{  mb: "25px",}}>
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
              placeholder= {t('write_something')}
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
            {slicedRessource.map((res, index) => {
              if (res.type === "img") {
                console.log("jmm", res);
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
                        position: "relative",
                        zIndex: "3",
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
                    <span>{res.url.name}</span>

                    <Iconbutton
                      onClick={() => {
                        setressource((prevAttachments) =>
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
                    position: "absolute",
                    zIndex: "2",
                      top: "50%",
                      right: "50%",
                      transform: "translate(50%, -50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      width: "100%",
                      height: "100%",
                      borderRadius: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem",
                    
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
            )}
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
            {t('photo')}
          </ImageUploadButton>
          <VideoUploadButton
            setvideofile={setvideofile}
            setressource={setressource}
            setposttype={setposttype}
            ressource={ressource}
          >
            <Videoicon />
            {t('video')}
          </VideoUploadButton>

          <FileUploadButton
            setattachment={setattachment}
            ressource={ressource}
            setressource={setressource}
            setposttype={setposttype}
          >
            <Calendericon />
            {t('attachment')}
          </FileUploadButton>

          <FileUploadButton
            setattachment={setattachment}
            ressource={ressource}
            setressource={setressource}
            setposttype={setposttype}
          >
            {/* <PollIcon /> */}
            <Pollicon />
            {t('poll')}
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
