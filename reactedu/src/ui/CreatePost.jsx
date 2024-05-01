// import ImageIcon from "@mui/icons-material/Image";
import Imageicon from "../assets/icons/Imageicon";

import Calendericon from "../assets/icons/Calendericon";
import Sendicon from "../assets/icons/Sendicon";
import Pollicon from "../assets/icons/Pollicon";

import Videoicon from "../assets/icons/Videoicon";

import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PollIcon from "@mui/icons-material/Poll";
// import SendIcon from "@mui/icons-material/Send";
import ImageUploadButton from "./ImageUploadButton";
import VideoUploadButton from "./VideoUploadButton";
import FileUploadButton from "./FileUploadButton";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Box, Button } from "@mui/material";
import Iconbutton from "@mui/material/IconButton";
import Event from "./Event";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

function CreatePost() {
  const [imgfile, setimgfile] = useState([]);
  const [videofile, setvideofile] = useState([]);
  const [ressource, setressource] = useState([]);
  //   const [imagepre, setimagepre] = useState([]);
  //   const [videopre, setvideopre] = useState("");
  const [attachment, setattachment] = useState([]);

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
          <Box sx={{ display: "flex" ,alignItems:''}}>
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
            <textarea placeholder="write something...🖊" style={{ border: "none", outline: "none", background: "none",width:'100%',resize:'none',paddingLeft:'10px',fontSize:'16px',fontFamily:'inherit',marginTop:'10px',overflow:"hidden"}}></textarea>
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
              } else {
                return null;
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
            )}

            {attachment.length > 0 && (
              <div style={{}}>
                {/* Render the uploaded attachments */}
                {attachment.map((attachment, index) => (
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
                    <span>{attachment.name}</span>

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
                ))}
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
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* <ImageIcon sx={{ color: "#666666" }} /> */}
            <Imageicon />
            Photos
          </ImageUploadButton>
          <VideoUploadButton
            setvideofile={setvideofile}
            setressource={setressource}
          >
            <Videoicon />
            Video
          </VideoUploadButton>
          <ImageUploadButton>
            {/* <EditCalendarIcon /> */}
            <Calendericon />
            Events
          </ImageUploadButton>
          <FileUploadButton setattachment={setattachment}>
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
              marginLeft:'10px'
            }}
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

{
  /* <ButtonGroup  aria-label="Basic button group">
<Button ><ImageIcon/>Photos</Button>
<Button><VideoCameraBackIcon/>Video</Button>
<Button><EditCalendarIcon/>Calander</Button>
<Button><PollIcon/>Polla</Button>
<Button><SendIcon/>Share</Button>

</ButtonGroup> */

  {
    /* <Box className="ressource" sx={{}}>
{imagepre !== '' ? (
  <div style={{ position: "relative" }}>
    <Iconbutton
      onClick={() => setimagepre("")}
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
      src={imagepre}
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
) : videopre !== '' ? (
    <div style={{ position: "relative" }}>
         <Iconbutton
      onClick={() => setvideopre("")}
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "100",
      }}
    >
      <CancelIcon />
    </Iconbutton>
      <video controls width="100%" height="auto">
       <source src={videopre} type="video/mp4"></source>
     </video>
    </div>
  
) : null}
</Box> */
  }

  // {imagepre.length > 0 && (
  //     imagepre.map((image, index) => (
  //       <div key={index} style={{ position: "relative" }}>
  //         <Iconbutton

  //           style={{
  //             position: "absolute",
  //             top: "0",
  //             right: "0",
  //             zIndex: "100",
  //           }}
  //         >
  //           <CancelIcon />
  //         </Iconbutton>
  //         <img
  //           src={image}
  //           alt=""
  //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
  //         />
  //       </div>
  //     ))
  //   ) }

  //   { videopre !== '' && (
  //       <div style={{ position: "relative" }}>
  //            <Iconbutton
  //         onClick={() => setvideopre("")}
  //         style={{
  //           position: "absolute",
  //           top: "0",
  //           right: "0",
  //           zIndex: "100",
  //         }}
  //       >
  //         <CancelIcon />
  //       </Iconbutton>
  //         <video controls width="100%" height="auto">
  //          <source src={videopre} type="video/mp4"></source>
  //        </video>
  //       </div>

  //   ) }
}
