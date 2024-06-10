import React from "react";
import { Box } from "@mui/material";

import styled from "@mui/material/styles/styled";
import { useRef } from "react";
import {Typography,Alert,Grid} from "@mui/material";
import { useTranslation } from "react-i18next";


const CustomInput = styled("input")({
  width: "50px",
  height: "50px",
  max: 1,
  textAlign: "center",
  appearance: "none",
  "-moz-appearance": "textfield", // Firefox
  "-webkit-appearance": "none", // Chrome, Safari, Edge
  "&::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
});

function CheckEmails({
  input1Ref,
  input2Ref,
  input3Ref,
  input4Ref,
  input5Ref,
  userInfo,
  errors,
}) {

  const {t}=useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Grid item xs={12}>
        {errors && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {errors}
          </Alert>
        )}
      </Grid>
      <Typography variant="h6" component="h2">
        {t("check_email")}
      </Typography>

      <Typography variant="h7" component="h2">
       {t('code_sent')} {userInfo.email} {t('code_enter')}
      </Typography>

      <Box sx={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <CustomInput type="number" max={1} ref={input1Ref} />
        <CustomInput type="number" max={1} ref={input2Ref} />
        <CustomInput type="number" max={1} ref={input3Ref} />
        <CustomInput type="number" max={1} ref={input4Ref} />
        <CustomInput type="number" max={1} ref={input5Ref} />
      </Box>
      {/* <button onClick={}>Submit</button> */}
    </Box>
  );
}

export default CheckEmails;
