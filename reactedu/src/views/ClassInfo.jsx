import React from "react";
import { Box } from "@mui/system";
import Covegroupe from "../ui/Covegroupe";
import CreatePost from "../ui/CreatePost";
import PostItem from "../ui/PostItem";
import Members from "../ui/Members";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { GetClassPosts } from "../services/apiPosts";
import Loading from "../utlis/Loading";
import { useStateContext } from "../context/ContextProvider";
import { login } from "../services/apiauth";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

function ClassInfo() {
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

  const [pageParam, setPageParam] = useState(1);

  const { Schoolname, classname } = useParams();
  const [showdrawer, setShowDrawer] = useState("none");
  const [drawertype, setDrawerType] = useState("permanent");
  const drawerWidth = 300;
  // console.log("this is the classname " ,classname);
  const location = useLocation();
  const { class_id } = location.state;
  const { school_id } = location.state;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["posts", class_id], // Add pageParam to the query key
      ({ pageParam = 1 }) => GetClassPosts(class_id, pageParam),
      {
        getNextPageParam: (lastPage) => {
          // console.log("lastPage is ",lastPage.meta.current_page);
          const nextPage = lastPage.meta.current_page + 1;

          return nextPage <= lastPage.meta.last_page ? nextPage : null;
        },
      }
    );

  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);


  if (loadingdata) return <Loading />;
  if (isLoading) return <Loading />;
  console.log("this is the user data classes", userData);

  const classinfo = userData.data.classes.filter(
    (classs) => classs.id == class_id
  );

  console.log("this is the class info", classinfo);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-around",
        marginTop: "50px",
      }}
    >
      <div>
        <Covegroupe classinfo={classinfo} />
        <Box sx={{ mb: "15px", width: { lg: "552px" }, marginTop: "65px" }}>
          <CreatePost />
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                {page.data.map((post) => (
                  <PostItem key={post.id} post={post} postsave={"no"} />
                ))}
              </div>
            </React.Fragment>
          ))}
          <div
            ref={ref}
            style={{
              display: "flex",
              justifyContent: "center",
              margintop: "15px",
            }}
          >
            {isFetchingNextPage && <span>loading....</span>}{" "}
            {/* Display loading indicator */}
          </div>
        </Box>
      </div>
      <Members />
    </Box>
  );
}

export default ClassInfo;
