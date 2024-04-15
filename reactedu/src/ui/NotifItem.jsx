 import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import Button from '@mui/material/Button';

function NotifItem({notif}) {
    return (
        <>
        <ListItem alignItems="flex-start" >
          <ListItemAvatar>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            <Avatar> {notif.first_name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
  secondary={
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
        <div>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
          marginRight={2}
        >
          {notif.first_name} {notif.last_name}

          
        </Typography>
        {notif.message}
        </div>
        
        <div>
          <Button variant="contained" color="success" sx={{mr:'5px'}}>
            Accept
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </div>
      </div>
    </React.Fragment>
  }
/>

        </ListItem>
        <Divider variant="inset" component="li" />

        </>
      
    )
}

export default NotifItem
