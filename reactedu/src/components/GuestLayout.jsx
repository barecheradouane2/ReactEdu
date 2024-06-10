import {Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import cookies from "js-cookie";
import { useEffect } from "react";
import MenuLanguage from "../utlis/MenuLanguage";

function GuestLayout() {
    const { user, token } = useStateContext();
    const { t, i18n } = useTranslation();
    const lng = cookies.get("i18next") || "en";

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

    if (token) {
      return <Navigate to="/" />;
    }
    return (
        // <div className="login-signup-form animated fadeInDown">
        // <div className="form">
        <>
        <div style={{position:'absolute'}}> 
            <MenuLanguage/>
        </div>
            <Outlet/>

            </>
        //    
        // 
    )
}

export default GuestLayout
