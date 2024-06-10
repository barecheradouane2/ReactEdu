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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import RegistreInformation from "../utlis/RegistreInformation.jsx";
import RegistrePassword from "../utlis/RegistrePassword.jsx";
import { GiConsoleController } from "react-icons/gi";
import CheckEmails from "../utlis/CheckEmails.jsx";
import { useRef } from "react";
import { register } from "../services/apiauth.js";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { resendotp } from "../services/apiauth.js";
import { verify } from "../services/apiauth.js";
import { useTranslation } from "react-i18next";

function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { setUser, setToken, _setUser } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [userInfo, setuserInfo] = useState({});
  const [step, setstep] = useState(0);

  const nameRef = createRef();
  const lastRef = createRef();
  const roleRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const { t } = useTranslation();

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);

  const queryClient = useQueryClient();

  const { mutate: Add, isLoading } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      //setschools(prevSchools => [...prevSchools, data]);
      setErrors(null);
      sendotp({ email: userInfo.email });
      setstep((step) => step + 1);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      let message = "";
    
      if (error.response.data?.password) {
        error.response.data.password.forEach((el) => {
          if (el === "The password must be at least 8 characters.") {
            message += t("password_short") + " " + t("password_length_should_be_more_than_6") + ",";
          }
          if (el === "The password confirmation does not match.") {
            message += t("password_match") + ",";
          }
        });
      }
    
      if (error.response.data?.email) {
        error.response.data.email.forEach((el) => {
          if (el === "The email has already been taken.") {
            message += t("email_exists") + ",";
          }
        });
      }
    
      setErrors(message);
    },
    
  });

  const { mutate: sendotp, isLoading: loadingsendotp } = useMutation({
    mutationFn: resendotp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(t("email_resent"));

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      toast.error("there is error ");
    },
  });
  const { mutate: verfiyemail, isLoading: loadingemail } = useMutation({
    mutationFn: verify,
    onSuccess: (data) => {
      // toast.success(data.token);

      const payload = {
        email: userInfo.email,
        password: userInfo.password,
      };
      setUser(payload);
      _setUser(payload);
      setToken(data.token);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
     
      
      if(input1Ref.current.value=='' || input2Ref.current.value=='' || input3Ref.current.value=='' || input4Ref.current.value=='' || input5Ref.current.value==''){
        setErrors(t('code_empty'));
      }else{
        setErrors(t('wrong_code')+" "+t('or')+" "+t('expired_code'));
      }
      
    },
  });

  const occupation = [
    {
      value: "parent",
      label: t("parent"),
    },
    {
      value: "teacher",
      label: t("teacher"),
    },
    {
      value: "admin",
      label: t("admin"),
    },
  ];

  const steps = [
    { id: 1, label: "" },
    { id: 2, label: "" },
    { id: 3, label: "" },
  ];

  //each reder will have a payload and a second payload =={}
  let payload = {};
  let secondpayload = {};

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (step == 0) {
      const payload = {
        first_name: nameRef.current.value,
        last_name: lastRef.current.value,
        role: roleRef.current.value,
        email: emailRef.current.value,
      };

      setuserInfo((prevUserInfo) => ({ ...prevUserInfo, ...payload }));
      console.log(payload);
      setstep((step) => step + 1);
    }
    if (step === 1) {
      secondpayload = {
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      };
      setuserInfo((prevUserInfo) => ({ ...prevUserInfo, ...secondpayload }));
      
      if (
        userInfo.first_name == "" ||
        userInfo.last_name == "" ||
        userInfo.role == "" ||
        userInfo.email == "" ||
        secondpayload.password == "" ||
        secondpayload.password_confirmation == ""
      ) {
        console.log(errors);
        setErrors(null);
        console.log("why it does not work here men???");
        setErrors(t("fill_all_fields"));
      } else {
        Add({ ...userInfo, ...secondpayload });
      }

      // axiosClient
      //   .post("/register", userInfo)
      //   .then(({ data }) => {
      //     console.log(payload);
      //     setUser(payload);
      //     _setUser(payload);
      //     setToken(data.token);
      //   })
      //   .catch((err) => {
      //     const response = err.response;
      //     alert(err);
      //     console.log(response);
      //     if (response && response.status === 422) {
      //       setErrors(response.data.errors);
      //     }
      //   });
    }
    // if (step === 2) {
    //   let num =input1Ref.current.value+''+input2Ref.current.value+''+input3Ref.current.value+''+input4Ref.current.value+''+input5Ref.current.value;
    //   console.log(Number(num));
    //   verfiyemail({otp:num,email:userInfo.email})

    //   // verfiyemail({otp:})

    //   // setstep((step) => step + 1);
    // }
    if (step == 3) {
      return;
    }
  };
  const handlebackstep = () => {
    if (step == 0) return;
    setstep((step) => step - 1);
  };
  const handleverify = () => {
    if (step === 2) {
      let num =
        input1Ref.current.value +
        "" +
        input2Ref.current.value +
        "" +
        input3Ref.current.value +
        "" +
        input4Ref.current.value +
        "" +
        input5Ref.current.value;
      console.log(Number(num));
      verfiyemail({ otp: num, email: userInfo.email });

      // verfiyemail({otp:})

      // setstep((step) => step + 1);
    }
  };

  return (
    <>
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
            padding: "0px 15px",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((step) => (
                <Step key={step.id}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "var(--color-blue-700)" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t("registration")}{" "}
                <span style={{ color: "var(--color-blue-700)" }}>
                  Educonnect
                </span>
              </Typography>

              <Box component="form" noValidate sx={{ mt: 3 }}>
                {step === 0 && (
                  <RegistreInformation
                    nameRef={nameRef}
                    lastRef={lastRef}
                    roleRef={roleRef}
                    emailRef={emailRef}
                    occupation={occupation}
                    userInfo={userInfo}
                  />
                )}
                {step === 1 && (
                  <RegistrePassword
                    showPassword={showPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    handleClickShowPassword={handleClickShowPassword}
                    passwordRef={passwordRef}
                    passwordConfirmationRef={passwordConfirmationRef}
                    userInfo={userInfo}
                    errors={errors}
                  />
                )}
                {step != 1 && step != 0 && (
                  <CheckEmails
                    input1Ref={input1Ref}
                    input2Ref={input2Ref}
                    input3Ref={input3Ref}
                    input4Ref={input4Ref}
                    input5Ref={input5Ref}
                    userInfo={userInfo}
                    errors={errors}
                  />
                )}

                <Grid container>
                  <Grid item xs>
                    <Button   onClick={()=> sendotp({ email: userInfo.email })} style={{ color: "var(--color-blue-700)" }}>
                    {step != 1 && step != 0 && t("resend_code")} 
                    </Button>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/login"
                      style={{ color: "var(--color-blue-700)" }}
                    >
                      {" "}
                      {t("login")}
                    </Link>

                   {/* <Button>resend</Button> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "15px" }}>
            {step != 2 ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handlebackstep}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {" "}
                  {t("go back")}
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("next_step")}
                </Button>
              </>
            ) : (
              <Button  disabled={loadingemail} variant="contained" onClick={() => handleverify()}>
                {t("verify_code")}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
