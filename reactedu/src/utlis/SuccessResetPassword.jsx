import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function SuccessResetPassword() {
  return (
    <Box>
      <Typography variant="h6" component="h2">
      Successful
      </Typography>

      <Typography
        variant="h7"
        component="h2"
        sx={{ color: "var(--color-secondary)" }}
      >
        Your password has been successfully change.
      </Typography>
    </Box>
  );
}

export default SuccessResetPassword;
