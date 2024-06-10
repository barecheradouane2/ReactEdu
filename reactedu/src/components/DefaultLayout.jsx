import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import cookies from "js-cookie";
import CheckEmails from "../utlis/CheckEmails";
import { useRef } from "react";
import { useState } from "react";
import Appbar from "../ui/Appbar";
import { Button } from "@mui/material";
import { verify } from "../services/apiauth.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { resendotp } from "../services/apiauth.js";


function DefaultLayout() {
  const { t, i18n } = useTranslation();
  const { user, token, setUser, setToken, profileinfo,_setprofileinfo } = useStateContext();
  // console.log(profileinfo.email);

  const [userInfo, setuserInfo] = useState(profileinfo);
  const [errors, setErrors] = useState(null);
  const lng = cookies.get("i18next") || "en";

  const queryClient = useQueryClient();

  const { mutate: sendotp, isLoading: loadingsendotp } = useMutation({
    mutationFn: resendotp,
    onSuccess: (data) => {
      toast.success(t("email_resent"));

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      // toast.error("there is error ");
    },
  });

  const { mutate: verfiyemail, isLoading: loadingemail } = useMutation({
    mutationFn: verify,
    onSuccess: (data) => {
      toast.success(t("success"));
      _setprofileinfo(data.data);
      setuserInfo(data.data);

      // const payload = {
      //   email: userInfo.email,
      //   password: userInfo.password,
      // };
      // setUser(payload);
      // _setUser(payload);
      // setToken(data.token);

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      if (
        input1Ref.current.value == "" ||
        input2Ref.current.value == "" ||
        input3Ref.current.value == "" ||
        input4Ref.current.value == "" ||
        input5Ref.current.value == ""
      ) {
        setErrors(t("code_empty"));
      } else {
        setErrors(t("wrong_code") + " " + t("or") + " " + t("expired_code"));
      }
    },
  });

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);

  const handleverify = () => {
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
  };

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      document.documentElement.dir = i18n.dir(lng);
    };

    // Set initial direction
    handleLanguageChange(lng);

    // Listen for language changes
    i18n.on("languageChanged", handleLanguageChange);

    // Clean up listener on component unmount
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      {userInfo.is_verified == true ? (
        
        <Outlet />
      ) : (
        <div
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            margin: " 250px auto",
          }}
        >
          <Appbar />

          <CheckEmails
            input1Ref={input1Ref}
            input2Ref={input2Ref}
            input3Ref={input3Ref}
            input4Ref={input4Ref}
            input5Ref={input5Ref}
            userInfo={userInfo}
            errors={errors}
          />

          <Button
            sx={{ width: "auto" }}
            disabled={loadingemail}
            variant="contained"
            onClick={() => handleverify()}
          >
            {t("verify_code")}
          </Button>

          <Button
            onClick={() => sendotp({ email: userInfo.email })}
            // style={{ color: "var(--color-blue-700)" }}
          >
          {t('no_email_recieved')}   {t("resend_code")}
          </Button>
        </div>
      )}
      {/* <Outlet /> */}
    </main>
  );
}

export default DefaultLayout;
