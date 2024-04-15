import NotifItem from "./NotifItem";
import { List } from "@mui/material";
function Notification({notification}) {
    
  return (
    <div className="flex flex-col bg-slate-400  notification">
      <div className="head">
        <h1 style={{color:"black"}}>Notification</h1>
      </div>
      <List sx={{ width: '100%', bgcolor: 'white' }}>

        {notification.map((notif) => (
          <NotifItem key={notif.id} notif={notif} />
        ))}
         </List>
    </div>
  );
}

export default Notification;
