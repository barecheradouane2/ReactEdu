import { Box } from "@mui/material";
import PostItem from "./PostItem";

// created_at: "2024-02-23T21:00:00.000Z",
function PostList() {


    const myposts = [
        {
       id: 1,
       first_name: "Bareche",
       last_name: "Radouane",
       classname: "Arabic 2AM3",
       created_at: "2024-02-23",
       text: "was fun day with our kids",
       photos: [
        {
            id: 1,
            url: "../../public/Frame 7080.png",
        },
        {
            id: 2,
            url: "../../public/بوضياف.jpg",
        }, {
            id: 5,
            url: "../../public/Frame 7080.png",
        },
        {
            id: 6,
            url: "../../public/300212184_174802558415318_277866569872518107_n.jpg",
        }, {
            id: 1,
            url: "../../public/cropped_school-classroom-1-3-scaled 1.png",
        }
        
      
       ],
       likes_count : 5,
       comments_count: 1,
       comments:[
        {
            id: 2,
            first_name: "Aichi",
            last_name: "Abdljbar",
            text: "thank you",
            likes_count : 1,
            replies:[
                {
                    id: 1,
                    first_name: "Bareche",
                    last_name: "Radouane",
                    text: "you are welcome",
                    likes_count : 1,
                }
            ]
        }, {
            id: 3,
            first_name: "Nedjah",
            last_name: "Anis",
            text: "nice day",
            likes_count : 0,
            replies:[
                {
                    id: 1,
                    first_name: "Bareche",
                    last_name: "Radouane",
                    text: "thanks anis ",
                    likes_count : 1,
                }
            ]
        }
       
       ]

     }

    ];

    return (
        <Box sx={{mt:'15px'}}>
        {myposts.map((post) => (
            <PostItem key={post.id} post={post} />
        ))}
    </Box>
    )
}

export default PostList
