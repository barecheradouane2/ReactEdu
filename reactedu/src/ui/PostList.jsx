import { Box } from "@mui/material";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";

import { GetSchoolPosts } from "../services/apiPosts";
import Loading from "../utlis/Loading";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LastPage } from "@mui/icons-material";
import { useInView } from "react-intersection-observer";
import React from "react";

// created_at: "2024-02-23T21:00:00.000Z",
function PostList() {
  // const [mydata, setData] = useState([]);

  // const [page, setPage] = useState(1);
  // const location = useLocation();
  // const { school_id } = location.state;

  // // Fetch data using useQuery hook instead of prefetchQuery
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["posts", school_id, page],
  //   queryFn: async () => {
  //     try {
  //       const data = await GetSchoolPosts(school_id, page);
  //       // Add data validation here if needed
  //       return data;
  //     } catch (error) {
  //       console.error("Error fetching school posts:", error);
  //       throw error; // Rethrow for error handling in the component
  //     }
  //   },
  // });

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     //   fetchData();
  //     setPage((prev)=>setPage(prev+1))
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // if (isLoading) return <Loading />;

  // const myposts = data.data;
  // //   const myposts = [
  //     {
  //       id: 1,
  //       first_name: "Bareche",
  //       last_name: "Radouane",
  //       classname: "Arabic 2AM3",
  //       created_at: "2024-02-23",
  //       text: "was fun day with our kids",
  //       photos: [
  //         {
  //           id: 1,
  //           url: "../../public/Frame 7080.png",
  //         },
  //         {
  //           id: 2,
  //           url: "../../public/بوضياف.jpg",
  //         },
  //         {
  //           id: 5,
  //           url: "../../public/Frame 7080.png",
  //         },
  //         {
  //           id: 6,
  //           url: "../../public/300212184_174802558415318_277866569872518107_n.jpg",
  //         },
  //         {
  //           id: 1,
  //           url: "../../public/cropped_school-classroom-1-3-scaled 1.png",
  //         },
  //       ],
  //       likes_count: 5,
  //       comments_count: 1,
  //       comments: [
  //         {
  //           id: 2,
  //           first_name: "Aichi",
  //           last_name: "Abdljbar",
  //           text: "thank you",
  //           likes_count: 1,
  //           replies: [
  //             {
  //               id: 1,
  //               first_name: "Bareche",
  //               last_name: "Radouane",
  //               text: "you are welcome",
  //               likes_count: 1,
  //             },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           first_name: "Nedjah",
  //           last_name: "Anis",
  //           text: "nice day",
  //           likes_count: 0,
  //           replies: [
  //             {
  //               id: 1,
  //               first_name: "Bareche",
  //               last_name: "Radouane",
  //               text: "thanks anis ",
  //               likes_count: 1,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ];
  // const location = useLocation();
  // const { school_id } = location.state;

  const location = useLocation();
  const { school_id } = location.state;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: "schoolPosts",
      queryFn: ({ pageParam = 1 }) => GetSchoolPosts(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.meta.current_page + 1;
        return nextPage <= lastPage.meta.last_page ? nextPage : undefined;
      },
    });

    
  

  console.log("data", data);

  const loadMoreButtonRef = React.useRef();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.data.map((post) => (
            // Render your post component here
            <PostItem key={post.id} post={post} />
          ))}
        </React.Fragment>
      ))}
      <div ref={loadMoreButtonRef} />
      {isFetchingNextPage ? <div>Loading...</div> : null}
    </div>
  );
}

export default PostList;
