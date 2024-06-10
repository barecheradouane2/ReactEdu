import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
function Passwordreset() {
  return (
    <Box>




      <Typography variant="h6" component="h2">
        Password reset
      </Typography>

      <Typography
        variant="h7"
        component="h2"
        sx={{ color: "var(--color-secondary)" }}
      >
        Your password has been successfully reset. click confirm to set a new
        password
      </Typography>
    </Box>
  );
}

export default Passwordreset;
