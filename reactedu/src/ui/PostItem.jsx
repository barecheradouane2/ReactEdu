import { Box, IconButton, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CommentList from "./CommentList";
import Reply from "./Reply";
import { useState } from "react";
import Modal from "react-modal";

import { FaBookmark } from "react-icons/fa";

import { FaArrowCircleRight } from "react-icons/fa";

import { FaCircleArrowLeft } from "react-icons/fa6";

import Comments from "../assets/icons/Comments";

import Like from "../assets/icons/Like";
import Likecover from "../assets/icons/Likecover";
import Share from "../assets/icons/Share";
import { LikePost } from "../services/apiPosts.js";
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {SavePost} from "../services/apiPosts.js"
// import { FaBookmark } from "react-icons/fa";

import { toast } from "react-hot-toast";
import Loading from "../utlis/Loading";

function PostItem({ post ,postsave}) {
  const MAX_IMAGES = 4;
  const phots = post.pictures || [];
  const attachment = post.attachment || [];
  const videos = post.videos || [];
  let pictures = [];
  let remainingImagesCount = 0;

  const [like, setLike] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes_count);
  const [save, setSave] = useState(post.isSaved);

  post.created_at = new Date(post.created_at);

  if (post && Array.isArray(post.pictures)) {
    pictures = post.pictures.slice(0, MAX_IMAGES);
    remainingImagesCount = post.pictures.length - MAX_IMAGES;
  }

  const remainingImagesText =
    remainingImagesCount > 0 ? `+${remainingImagesCount} more` : "";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);

    console.log(phots[currentImageIndex].url);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === phots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? phots.length - 1 : prevIndex - 1
    );
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns:
      post.pictures && post.pictures.length === 1
        ? "1fr"
        : "repeat(auto-fill, minmax(200px, 1fr))",
    gridGap: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const queryClient = useQueryClient();

  const { mutate: Addlike, isLoading } = useMutation({
    mutationFn: LikePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      setLike(!like);
      setLikeCount(like == true ? likeCount - 1 : likeCount + 1);

      // toast.success("you Like the post");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function handleLikepost() {
    const payload = {
      id: post.id,
    };

    Addlike(payload);
  }
  const { mutate: savepost } = useMutation({
    mutationFn: SavePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    

       toast.success("you save the post");
    },
    onError: (error) => {
      toast.error(error.message);
    }, });

  function handleSavePost() {
    const payload = {
      id: post.id,
    };
    setSave(true);
    savepost(payload);
    
  }


  console.log(postsave.save=='yes'&& post.isSaved==true)
  // if (isLoading) return <Loading />;

  return (
    ( (postsave.save=='yes'&& post.isSaved==true) || (postsave.save!='yes')  )&& (
   <Box
      sx={{
        backgroundColor: "white",
        px: "15px",
        py: "15px",
        borderRadius: "15px",
      }}
    >
      <Box
        className="postheader"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
          >
            {post.first_name[0].toUpperCase()}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h8"
              sx={{ mt: "10px", ml: "12px", mr: "8px", color: "black" }}
            >
              {post.first_name.charAt(0).toUpperCase() +
                post.first_name.slice(1)}{" "}
              {post.last_name.charAt(0).toUpperCase() + post.last_name.slice(1)}
            </Typography>

            <div style={{ mt: "10px", ml: "12px", mr: "8px", color: "black" }}>
              <span className="secondspan">
                🕛{" "}
                {post.created_at.toISOString().slice(0, 19).replace("T", " ")}{" "}
                on
              </span>

              <span className="mainspan"> {post.classname}</span>
            </div>
          </Box>
        </Box>
        <Box>
          {/* <IconButton>
            <BookmarkBorderIcon />
          </IconButton> */}
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        className="postbody"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <span
          className="mainspan"
          style={{ fontWeight: "normal", padding: "15px 0px" }}
        >
          {post.text}
        </span>
        <Box sx={gridStyle}>
          {post.pictures &&
            pictures.map((photo, index) => (
              <div key={photo.id} style={{ position: "relative" }}>
                <img
                  src={`http://127.0.0.1:8000/storage/${photo.url}`}
                  alt="post"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  onClick={() => openModal(index)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                  }}
                />
                {index === MAX_IMAGES - 1 && remainingImagesText && (
                  <div
                    style={{
                      position: "absolute",
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
                    {remainingImagesText}
                  </div>
                )}
              </div>
            ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {attachment.map((attach, index) => (
            <div key={attach.id} style={{ position: "relative" }}>
              {/* <img
                key={attach.id} // Ensure each image has a unique key
                width="50px"
                height="50px"
                src={attach.url}
                alt={`Attachment ${index}`} // Provide appropriate alt text for accessibility
              /> */}

              {console.log("attache", attach)}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  width="50px"
                  height="50px"
                  src="
                  ../../public/file-blank-solid-240.png"
                />

                <a
                  href={`http://127.0.0.1:8000/storage/${attach.url}`}
                  download
                >
                  {" "}
                  {attach.url.slice(17)}{" "}
                </a>
              </div>
            </div>
          ))}
        </Box>

        <Box>
          {videos.map((video, index) => (
            <div key={video.id} style={{ position: "relative" }}>
              <video
                key={video.id} // Ensure each image has a unique key
                width="100%"
                height="auto"
                controls
              >
                <source
                  src={`http://127.0.0.1:8000/storage/../public/posts/video/${video.url}`}
                  type="video/mp4"
                />
              </video>
            </div>
          ))}
        </Box>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              padding: 0,
              border: "none",
              background: "#fff",
              maxWidth: "100%",
              maxHeight: "100%",

              zIndex: 1000,
              // width: "550px",
              // height: "auto",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              bqckground: "#40d74a",
              position: "relative",
              //  zIndex: 2000,
            }}
          >
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
                position: "absolute",
                top: "1050%",
                left: "0px",
              }}
              onClick={prevSlide}
            >
              <FaCircleArrowLeft sx={{}} />
            </button>
            {/* <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              {/* <CloseIcon /> }
            </button> */}
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
                position: "absolute",
                top: "1050%",
                right: "0px",
              }}
              onClick={nextSlide}
            >
              <FaArrowCircleRight />
            </button>
          </div>
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "24px",
              color: "#333",
            }}
            onClick={closeModal}
          >
            &times;
          </span>
          <div style={{ paddding: "0px 50px" }}>
            {phots[currentImageIndex] && (
              <img
                src={`http://127.0.0.1:8000/storage/${phots[currentImageIndex].url}`}
                alt="post"
                style={{
                  objectFit: "contain",
                  width: "440px",
                  height: "440px",
                  // maxHeight: "calc(100vh - 120px)",
                }}
              />
            )}
          </div>
        </Modal>
      </Box>
      <Box
        className="postfooter"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <IconButton onClick={handleLikepost}>
            {like ? <Likecover /> : <Like />}
            {/* <Like /> */}
          </IconButton>
          likes {likeCount}
        </Box>
        <Box>
          <IconButton>
            <Comments />
          </IconButton>
          {/* comments {post.comments_count} */}
          Comment {post.comments_count}
        </Box>

        <Box>
          <IconButton onClick={handleSavePost}>
          {save?<FaBookmark/>:<BookmarkBorderIcon />}  
          </IconButton>
          Save
        </Box>
      </Box>

      <Box
        className="postcomments"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Reply id={post.id} first_name={post.first_name} type={"comment"} />

        <Box
          className="comments"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {<CommentList id={post.id} />}
        </Box>
      </Box>
    </Box>
  ));
}

export default PostItem;
