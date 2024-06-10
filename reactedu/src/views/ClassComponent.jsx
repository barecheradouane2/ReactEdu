import React from "react";
import Posts from "../ui/Posts";
import Members from "../ui/Members";
import Covegroupe from "../ui/Covegroupe";
import Box from "@mui/material/Box";
import { useLocation, useParams } from "react-router-dom";
import CreatePost from "../ui/CreatePost";
import PostItem from "../ui/PostItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { GetClassPosts } from "../services/apiPosts";
import Loading from "../utlis/Loading";
import DrawerClass from "../ui/DrawerClass";
import { useStateContext } from "../context/ContextProvider";
import { login } from "../services/apiauth";
import { useQuery } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";

function ClassComponent() {
 
  const { user } = useStateContext();

  const fetchUserData = async () => {
    try {
      const response = await login(user);

      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const { isLoading: loadingdata, data: userData } = useQuery(
    ["userData"],
    fetchUserData
  );

  const [showdrawer, setShowDrawer] = useState("none");
  const [drawertype, setDrawerType] = useState("permanent");
  const drawerWidth = 300;


  const location = useLocation();
  const { class_id } = location.state;
  const { school_id } = location.state;

  const funshowdrawer = () => {
    return;
  };

  const funShowDrawer = () => {
    setShowDrawer("block");
    setDrawerType("temporary");
  };

  const funcCloseDrawer = () => {
    setDrawerType("permanent");
    setShowDrawer("none");
  };

  if (loadingdata) return <Loading />;
 


  const classinfo = userData.data.classes.filter(
    (classs) => classs.id == class_id
  );


  return (
    <>
     <DrawerClass   class_id={class_id} school_id={school_id} classinfo={classinfo} drawerWidth={drawerWidth} showdrawer={showdrawer} drawertype={drawertype} funclosedrawer={funcCloseDrawer}/>

     <Outlet />

   
    
    </>
  
  );
}

export default ClassComponent;
