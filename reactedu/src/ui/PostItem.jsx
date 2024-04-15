import { Box, IconButton, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import CommentList from "./CommentList";
import Reply from "./Reply";
import React, { useState } from 'react';
import Modal from 'react-modal';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
function PostItem({ post }) {

  const MAX_IMAGES = 4;
  const phots=post.photos;
  const photos = post.photos.slice(0, MAX_IMAGES); // Take only the first four images

  const remainingImagesCount = post.photos.length - MAX_IMAGES;
  const remainingImagesText =
    remainingImagesCount > 0 ? `+${remainingImagesCount} more` : "";


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);
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
      post.photos.length === 1
        ? "1fr"
        : "repeat(auto-fill, minmax(200px, 1fr))",
    gridGap: "10px",
    // border: "1px solid #ccc",
    borderRadius: "5px",
    // padding: "10px",
    cursor: "pointer",
  };

 
  return (
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
            {post.first_name[0]}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h8"
              sx={{ mt: "10px", ml: "12px", mr: "8px", color: "black" }}
            >
              {post.first_name} {post.last_name}
            </Typography>

            <div style={{ mt: "10px", ml: "12px", mr: "8px", color: "black" }}>
              <span className="secondspan">🕛 {post.created_at} on</span>

              <span className="mainspan"> {post.classname}</span>
            </div>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
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
          {photos.map((photo, index) => (
            <div key={photo.id} style={{ position: "relative" }}>
              <img
                src={photo.url}
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
                    // bottom: "5px",
                    // right: "5px",
                    top:"50%",
                    right:"50%",
                    transform: "translate(50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    // padding: "2px 5px",
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

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            border: 'none',
            background: '#fff',
            maxWidth: '80%',
            maxHeight: '80%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <button style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', background: '#333', color: '#fff', cursor: 'pointer' }} onClick={prevSlide}><ArrowBackIosIcon/></button>
          <button style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', background: '#333', color: '#fff', cursor: 'pointer' }} onClick={closeModal}><CloseIcon/></button>
          <button style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', background: '#333', color: '#fff', cursor: 'pointer' }} onClick={nextSlide}><NavigateNextIcon/></button>
        </div>
        <span style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', fontSize: '24px', color: '#333' }} onClick={closeModal}>&times;</span>
        <img src={phots[currentImageIndex].url} alt="post" style={{ objectFit: 'contain', width: '440px', height: 'auto', maxHeight: 'calc(100vh - 120px)' }} />
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
          <IconButton>
            <ThumbUpOffAltIcon />
          </IconButton>
          likes {post.likes_count}
        </Box>
        <Box>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          comments {post.comments_count}
        </Box>

        <Box>
          <IconButton>
            <SendIcon />
          </IconButton>
          Share
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
        <Reply first_name={post.first_name} />

        <Box
          className="comments"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {<CommentList comments={post.comments} />}
        </Box>
      </Box>
    </Box>
  );
}

export default PostItem;
