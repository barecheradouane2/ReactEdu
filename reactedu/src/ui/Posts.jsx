import { Box } from "@mui/material"
import CreatePost from "./CreatePost"
import PostList from "./PostList"
function Posts() {
    return (
        <Box sx={{ mb:'15px',width:{ lg: '552px'},marginTop:'65px'}}>
              <CreatePost/>
              <PostList/>
        </Box>
    )
}

export default Posts
