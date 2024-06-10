import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosClient from "../axios-client.js";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createRef } from "react";
import { useEffect } from "react";
import { GiConsoleController } from "react-icons/gi";
import { useTranslation } from "react-i18next";

function RegistreInformation({nameRef,lastRef,roleRef,emailRef,occupation,userInfo}) {

  // const  handleSubmit = (ev) => {
  //   ev.preventDefault();

  //   const payload = {
  //     first_name: nameRef.current.value,
  //     last_name: lastRef.current.value,
  //     role: roleRef.current.value,
  //     email: emailRef.current.value,
  //   };


   
  //   setuserInfo((prevUserInfo) => ({ ...prevUserInfo, ...payload }));

  
    


  //   setstep(1);
   

  // };
  
  const {t}=useTranslation ();
  
  return (
  
     
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
    

            <TextField
              autoComplete="given-name"
              defaultValue={userInfo?.first_name}
              name="firstName"
              required
              fullWidth
              id="firstName"
              label={t("first_name")}
              inputRef={nameRef}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              defaultValue={userInfo?.last_name}
              label={t("last_name")}
              name="lastName"
              autoComplete="family-name"
              inputRef={lastRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              defaultValue={userInfo?.email}
              id="email"
              label={t("email")}
              name="email"
              autoComplete="email"
              inputRef={emailRef}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency"
              inputRef={roleRef}
              
              select
              label={t("occupation")}
              defaultValue={userInfo?.role}
              helperText={t("select_role")}
              sx={{ width: "100%" }}
            >
              {occupation.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        
      
    
    
  );
}

export default RegistreInformation;
