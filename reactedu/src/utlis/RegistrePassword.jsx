import React from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createRef } from "react";
import { useTranslation } from "react-i18next";

function RegistrePassword({
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  passwordRef,
  passwordConfirmationRef,
  userInfo,
  errors
}) {
  const { t,i18n } = useTranslation();
 

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>

        {errors && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {errors}
            </Alert>


        )}
       
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            {t("password")}
          </InputLabel>
          <OutlinedInput
            id="password"
            defaultValue={userInfo?.password}
            inputRef={passwordRef}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={t("password")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "1px",
                },
              },
              "& .MuiInputAdornment-positionEnd": {
                marginLeft: i18n.language === "ar" ? "0" : "auto",
                marginRight: i18n.language === "ar" ? "auto" : "0",
                order: i18n.language === "ar" ? -1 : 1, // Ensures the icon button is on the correct side
              },
              "& input": {
                textAlign: i18n.language === "ar" ? "right" : "left",
              },
            }}


          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
             {t('confirm_password')}
          </InputLabel>
          <OutlinedInput
            defaultValue={userInfo?.password_confirmation}
            id="passwordconfirmation"
            inputRef={passwordConfirmationRef}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"

            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "1px",
                },
              },
              "& .MuiInputAdornment-positionEnd": {
                marginLeft: i18n.language === "ar" ? "0" : "auto",
                marginRight: i18n.language === "ar" ? "auto" : "0",
                order: i18n.language === "ar" ? -1 : 1, // Ensures the icon button is on the correct side
              },
              "& input": {
                textAlign: i18n.language === "ar" ? "right" : "left",
              },
            }}




          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default RegistrePassword;
