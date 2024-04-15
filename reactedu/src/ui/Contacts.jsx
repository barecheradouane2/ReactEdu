import VideocamIcon from '@mui/icons-material/Videocam';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ContactItem from './ContactItem';
import List from '@mui/material/List';
import Groupe from './Groupe'
import CakeIcon from '@mui/icons-material/Cake';
import Event from './Event';
function Contacts() {
    const contacts = [
        {
            id: 1,
            first_name: 'Bareche',
            last_name: 'Radouane',
        },
        {
            id: 2,
            first_name: 'Aichi',
            last_name: 'Abdljbar',
        },
        {
            id: 3,
            first_name: 'Hassan',
            last_name: 'Toumi',
        },
        {
            id: 4,
            first_name: 'Sofia',
            last_name: 'Belkacem',
        },
        {
            id: 5,
            first_name: 'Yassine',
            last_name: 'Benali',
        },
        {
            id: 6,
            first_name: 'Nadia',
            last_name: 'Hamidi',
        },
        {
            id: 7,
            first_name: 'Ali',
            last_name: 'Kader',
        }
    ];
    const groups=[
        {
            id: 1,
            name: "Arabic 2AM3",
            grade_level: 3,
             url : "../../public/Frame 7081.png" ,
            subject: "Arabic"
        },
        {
            id: 2,
           
            name: "History 101",
            grade_level: 10,
            url:"../../public/Group 26 (1).png",
            subject: "History"
        },
        {
            id: 3,
            name: "Math 2AM1",
            grade_level: 10,
            url:"../../public/Group 26.png",
            subject: "Math"
        },
       
    ];
    
    return (
        <Box   style={{height:'fit-content',width:'250px',borderRadius:'15px'}} className='contact'>

         {/* <Event>
        <span  className='spantitle'>Birthday</span>
        <br/>
        <div style={{display:'flex',gap:'15px',py:'10px',alignItems:'center'}}>
            <CakeIcon/>
                <span>  Ahmed Ali  and 2 otheres have all birthday to day </span>
        </div>


        </Event> */}
            <div className="conctactheader">
                <span className='spantitle'>Contacts</span>
                <div className='contacticons'>
                    <IconButton><VideocamIcon/></IconButton>
                    <IconButton><SearchIcon/></IconButton>
                    <IconButton><SettingsIcon/></IconButton>
                </div>
            </div>

            <div className="contactbody">
                {contacts.map((contact) => (
                 <ContactItem  key={contact.id} contact={contact} />
                ))}
            </div>

            <div className="contactgroupe" style={{padding:'10px 0px'}}>
                <span className='spantitle'>Groups</span>
                <div style={{padding:' 0px',margin:'0px'}}>
                    {groups.map((group) => (
                       
                        <Groupe key={group.id} group={group} />
                    ))}
                </div>
            </div>
        </Box>
    )
}

export default Contacts
