import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import CreateSchoolPopup from "../ui/CreateSchoolPopup";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../utlis/ConfirmationModal";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;

function EditDelteMenue({funcshowCreatePopup,setdata, dataItem, deleteItem,type 
}) {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showconfirm,setshowconfirm]=useState(false); 
  
  const { user, setUser } = useStateContext();
  const{t}=useTranslation();


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const funPopup = () => {
    setShowCreatePopup(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    funPopup();
    funcshowCreatePopup();
    handleClose();
    setdata(dataItem);
    console.log("this is the data that can be update",dataItem);

    // updateSchool(school.id);
   
  };

  const handleDelete = () => {
    setshowconfirm(true); 
    handleClose();
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

      <ConfirmationModal open={showconfirm} message={type=='school'?t("confirm_delete"):t("confirm_delete_class")} onConfirm={()=>deleteItem({id:dataItem.id})} onCancel={() => setshowconfirm(false)} />
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
        <MenuItem onClick={handleUpdate}>{type=='school'?t("edit_school"):t("update_class")}</MenuItem>
        <MenuItem onClick={handleDelete}>{type=='class'?t("delete2"):t("delete1")}</MenuItem>
      </Menu>
    </div>
  );
}

export default EditDelteMenue;
