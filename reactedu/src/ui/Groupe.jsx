import React from 'react';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Groupe({ group }) {
  
  let { schoolname } = useParams();

  // Decode the schoolname from URI
  schoolname = decodeURIComponent(schoolname);

  return (
    <div key={group.id} style={{display:'flex',alignItems:'center',justifyContent:'start',
    gap:'10px' ,padding:'5px 0px' 
  
    }}>
      <Avatar src={group.url} sx={{ bgcolor: deepOrange[500] }} variant="square" />
      <Link to={`/schools/${schoolname}/${group.name}`}  style={{textDecoration:'none',color:'#212121'}}>
  <span>{group.name}</span>
      </Link>
    </div>
  );
}

export default Groupe;
