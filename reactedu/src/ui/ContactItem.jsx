
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';
function ContactItem({contact}) {


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
      
      }));








    return (
        <div style={{display:"flex",justifyContent:"",alignItems:"center"
        ,gap:'5px',padding:"5px 0px",
       
        }}>
         <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
         >
        <Avatar alt={contact.first_name[0]} src="/static/images/avatar/1.jpg" />
      </StyledBadge>
            
            <span>{contact.first_name} {contact.last_name}</span>
          
        </div>
    )
}

export default ContactItem
