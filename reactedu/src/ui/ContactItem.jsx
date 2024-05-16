import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IconButton } from "@mui/material";

function ContactItem({ contact }) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "5px",
        padding: "5px 0px",
      }}
    >
      <div>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >

        <Avatar
          alt={contact.first_name[0].toUpperCase()}
          src="/static/images/avatar/1.jpg"
        />
      </StyledBadge>

      <span style={{marginLeft:"5px"}}>
        {contact.first_name.charAt(0).toUpperCase() +
          contact.first_name.slice(1)}{" "}
        {contact.last_name.charAt(0).toUpperCase() + contact.last_name.slice(1)}
      </span>
      </div>
      <IconButton>
      <IoChatboxEllipsesOutline/>
      </IconButton>
      
    </div>
  );
}

export default ContactItem;
