import Body from "../ui/Body";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../utlis/Loading";
import React from "react";
import { explorePosts } from "../services/apiPosts";
import PostItem from "../ui/PostItem";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

function Explore() {
  const drawerWidth = 300;
  const [pageParam, setPageParam] = useState(1);
  const { t, i18n } = useTranslation();


  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["posts"], // Add pageParam to the query key
    ({ pageParam = 1 }) => explorePosts(pageParam),
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

  if (isLoading) return <Loading />;

  if (error) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ mb: "15px", width: { lg: "552px" }, marginTop: "65px" }}>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "25px" }}
            >
              {page.data.map((post) => (
                <PostItem key={post.id} post={post} postsave={"no"} />
              ))}

              {page.data.length ==0 && t('empty_explore_posts')}
            </div>
          </React.Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : null}
        {hasNextPage ? (
          <div ref={ref} style={{ textAlign: "center" }}>
            {isFetchingNextPage ? (
              <Loading />
            ) : (
              <button onClick={() => fetchNextPage()}>Load More</button>
            )}
          </div>
        ) : null}
      </Box>
    </Box>
  );
}

export default Explore;
