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
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login } from "../services/apiauth.js";
import { toast } from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const defaultTheme = createTheme();

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken, _setUser ,_setprofileinfo} = useStateContext();
  const [message, setMessage] = useState(null);

  const { t, i18n } = useTranslation();

  const queryClient = useQueryClient();

  const { mutate: log, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
     
      setMessage(null);
      console.log(data.data);

      _setprofileinfo(data.data);

      setUser(payload);
      _setUser(payload);

      console.log(payload);
      console.log("this is the data", data);
      setToken(data.token);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      console.log(error.response.data.error);

      if (
        error.response.data.error === "The provided credentials are incorrect."
      ) {
        setMessage(t("wrong_credentials"));
      }
    },
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!payload.email) {
      setMessage(t("email_cant_be_empty"));
      return;
    } else if (!payload.password) {
      setMessage(t("password_cant_be_empty"));
      return;
    } else {
      log(payload);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../../public/login1.png"
          alt="random"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3, // Added padding to ensure there's some space around the form
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "var(--color-blue-700)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("login")}{" "}
            <span style={{ color: "var(--color-blue-700)" }}>Educonnect</span>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }} // Ensure the form takes full width
          >
            {message && <Alert severity="error">{message}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("email")}
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("password")}
                </InputLabel>
                <OutlinedInput
                  required
                  id="password"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 ,backgroundColor:"var(--main-color) "}}
            >
              {t("login")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/Forgotpassword"
                  style={{ color: "var(--color-blue-700)" }}
                >
                  {t("forgot_password")}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{ color: "var(--color-blue-700)" }}>
                  {t("dont_have_account")} {t("sign_up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
