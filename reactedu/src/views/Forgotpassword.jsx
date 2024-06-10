import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { forgotpassword } from "../services/apiauth.js";
import { useRef } from "react";
import { resendotp } from "../services/apiauth.js";
import { toast } from "react-hot-toast";

import { verify } from "../services/apiauth.js";
import {resentpassword} from "../services/apiauth.js";
import {changepassword} from "../services/apiauth.js";

import CheckEmails from "../utlis/CheckEmails.jsx";
import Passwordreset from "../utlis/Passwordreset.jsx";
import NewPassword from "../utlis/NewPassword.jsx";
import SuccessResetPassword from "../utlis/SuccessResetPassword.jsx";


function Forgotpassword() {
  const [message, setmessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [step, setstep] = useState(0);
  const [userInfo,setuserInfo]=useState({});
 

  const emailRef = createRef();
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);

  const queryClient = useQueryClient();
  const { mutate: sendpas, isLoading } = useMutation({
    mutationFn: forgotpassword,
    onSuccess: (data) => {
      //setschools(prevSchools => [...prevSchools, data]);
      setErrors(null);
      setstep((step) => step + 1);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      setErrors(error.response.data.error);
    },
  });

  const { mutate: verfiyemail, isLoading: loadingemail } = useMutation({
    mutationFn: verify,
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      setErrors(null);
      setstep((step) => step + 1);
    },
    onError: (error) => {
     
      setErrors("the otp code is invalid")
    },
  });

  const { mutate: resentpas, isLoading:resentLoading } = useMutation({
    mutationFn: resentpassword,
    onSuccess: (data) => {
      //setschools(prevSchools => [...prevSchools, data]);
      setErrors(null);
      setstep((step) => step + 1);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      setErrors(error.response.data.error);
    },
  });

  const { mutate: changepas, isLoading:loadingchange } = useMutation({
    mutationFn: changepassword,
    onSuccess: (data) => {
      //setschools(prevSchools => [...prevSchools, data]);
      setErrors(null);
      setstep((step) => step + 1);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      setErrors(error.response.data.error);
    },
  });

  const handlesubmit = () => {
    if (step == 0) {
      setuserInfo({email:emailRef.current.value});
      sendpas({ email: emailRef.current.value });
    }else if(step==1){
      console.log(userInfo.email);

      verfiyemail({ email: userInfo.email, otp:input1Ref.current.value+input2Ref.current.value+input3Ref.current.value+input4Ref.current.value+input5Ref.current.value  });
    }else if(step==2){
      resentpas({ email: emailRef.current.value });
    }else if(step==3){
      changepas({password: input1Ref.current.value , password_confirmation: input2Ref.current.value,email: emailRef.current.value});
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
            width: "90%",
            // maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "var(--color-blue-700)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in{" "}
            <span style={{ color: "var(--color-blue-700)" }}>Educonnect</span>
          </Typography>
          <Box
            component="form"
            width={{ width: "100%" }}
            noValidate
            sx={{ mt: 1 }}
          >
            {errors && <Alert severity="error">{errors}</Alert>}
            {step==0&& <Box>
              {errors && <Alert severity="error">{errors}</Alert>}
            <Typography variant="h6" component="h2">
              Forgot password
            </Typography>

            <Typography
              variant="h7"
              component="h2"
              sx={{ color: "var(--color-secondary)" }}
            >
              Please enter your email to reset the password
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />

            <Grid container>
              <Grid item>
                <Link to="/login" style={{ color: "var(--color-blue-700)" }}>
                  {" "}
                  Log in
                </Link>
              </Grid>
            </Grid>

           
            </Box>}

            {step==1 && <CheckEmails  errors={errors} userInfo={userInfo} input1Ref={input1Ref} input2Ref={input2Ref}   input3Ref={input3Ref} input4Ref={input4Ref} input5Ref={input5Ref}/>}

            {step==2 && <Passwordreset /> }

            {step==3 &&  <NewPassword   passwordRef={passwordRef} passwordConfirmationRef={passwordConfirmationRef}/>}
            {step==4 && <SuccessResetPassword/> }

            <Button
              onClick={handlesubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Forgotpassword;
