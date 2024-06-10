import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from "@mui/icons-material/Language";
import { IconButton } from '@mui/material';
import { GrLanguage } from "react-icons/gr";


import { useTranslation } from 'react-i18next';


export default function MenuLanguage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <div>
      {/* <Button
        
      >
        Dashboard
      </Button> */}

      <IconButton
      id="demo-positioned-button"
      aria-controls={open ? 'demo-positioned-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      >
         <div
              style={{
                backgroundColor: "#E9E9E9",
                // width: "50px",
                // height: "50px",
                padding: "12px 12px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
        <GrLanguage />
        </div>
      </IconButton>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>changeLanguage('en')}> <img  style={{width:'40px',height:"40px" ,marginRight:'5px'}}src="../../public/english.png"/>{t('English')}</MenuItem>
        <MenuItem onClick={()=>changeLanguage('ar')}> <img  style={{width:'40px',height:"40px" ,marginRight:'5px'}}src="../../public/arabic.png"/> {t('Arabic')}</MenuItem>
        <MenuItem onClick={handleClose}> <img  style={{width:'40px',height:"40px" ,marginRight:'5px'}}src="../../public/france.png"/>{t('French')}</MenuItem>
      </Menu>
    </div>
  );
}
