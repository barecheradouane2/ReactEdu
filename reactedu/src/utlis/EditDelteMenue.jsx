import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import CreateSchoolPopup from "../ui/CreateSchoolPopup";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-hot-toast";

const ITEM_HEIGHT = 48;

function EditDelteMenue({ school, setschools,deleteSchool }) {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const { user, setUser } = useStateContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const funcshowCreatePopup = () => {
    setShowCreatePopup(true);
  };
  const closeshowCreatePopup = () => {
    setShowCreatePopup(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    funcshowCreatePopup();
    handleClose();

    // updateSchool(school.id);
   
  };

  const handleDelete = () => {
    deleteSchool(school.id, {
      onSuccess: () => {
        handleClose();
        setschools((prevSchools) =>
          prevSchools.filter((item) => item.id !== school.id)
        );
        toast.success("School Deleted Successfully");
      },
      onError: () => {
        toast.error("Failed to delete school");
      },
    });
  };

  return (
    <div style={{ width: "fit-content", height: "fit-content" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ position: "absolute", right: "0", top: "0" }}
      >
        <MoreVertIcon />
      </IconButton>

      <CreateSchoolPopup
        school={school}
        showCreatePopup={showCreatePopup}
        closeshowCreatePopup={closeshowCreatePopup}
      />

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleUpdate}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default EditDelteMenue;
