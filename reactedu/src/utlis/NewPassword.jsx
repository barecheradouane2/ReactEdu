import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton ,Grid} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function NewPassword({ showPassword, handleClickShowPassword, handleMouseDownPassword, passwordRef, passwordConfirmationRef, userInfo}) {
  return (
    <Box>
      <Typography variant="h6" component="h2">
        Set a new password
      </Typography>

      <Typography
        variant="h7"
        component="h2"
        sx={{ color: "var(--color-secondary)" }}
      >
        Create a new password. Ensure it differs from previous ones for security
      </Typography>

      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
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
            label="Password"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirmation Password
          </InputLabel>
          <OutlinedInput
            // defaultValue={userInfo?.password_confirmation}
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
          />
        </FormControl>
      </Grid>





    </Box>
  );
}

export default NewPassword;
