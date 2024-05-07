import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import PostItem from "./PostItem";
import Loading from "../utlis/Loading";
import { GetSchoolPosts } from "../services/apiPosts";
import { useInView } from "react-intersection-observer";

function PostList() {
  const location = useLocation();
  const { school_id } = location.state;
  const [pageParam, setPageParam] = useState(1);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
  ["posts", school_id], // Add pageParam to the query key
  ({ pageParam = 1 }) => GetSchoolPosts(school_id, pageParam),
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
    if (inView  && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage,hasNextPage]);

  if (isLoading) return <Loading />;

  if (error) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {page.data.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </React.Fragment>
      ))}
      <div ref={ref}>
        {isFetchingNextPage && <span>loading....</span>} {/* Display loading indicator */}
      </div>
    </div>
  );
}

export default PostList;