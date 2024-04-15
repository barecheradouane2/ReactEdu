import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function Covegroupe() {
    return (
        <div className='Covegroupe'>
            <div><img src="../../public/Classroom-Procedures-min 1.png" alt="" 
            width='100%' /></div>
          <div className='head'>
             <AvatarGroup max={4}>
       
               <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
             <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              
             </AvatarGroup>
          </div>
       
          <div className='body'><span className='mainspan'>Arabic 2AM3</span></div>
          <div className='botom'>
          <span className='maintitle'>Created by <span className='owner' >Abdljbar Aichi </span> </span>
          </div>
        </div>
    )
}

export default Covegroupe
