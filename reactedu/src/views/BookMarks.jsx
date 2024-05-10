
import React from 'react';
import { Box } from '@mui/system';
import PostList from '../ui/PostList';
import { useLocation } from 'react-router-dom';
function BookMarks() {
    const location = useLocation();
    const { school_id } = location.state;
    console.log('BookMarks',school_id)
    return (
        <Box sx={{ mb:'15px',width:{ lg: '552px'},marginTop:'65px'}}>
        
        <PostList  save={'yes'}/>
       </Box>
    )
}

export default BookMarks
