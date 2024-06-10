import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import ContactItem from "./ContactItem";
import { useState } from "react";
import { useTranslation } from 'react-i18next';


function Members() {
  const [inputVisible, setInputVisible] = useState(false);
  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };
  const [clickparent, setClickparent] = useState(true);
  const [clickstudent, setClickstudent] = useState(false);
  const {t}=useTranslation();

  const [membertype,setmembertype]=useState(false);
  
  function changeType(type){
   
   
    if(type=="Parents"){
      setmembertype(false);
      setClickparent(true);
      setClickstudent(false);
    }else if(type=="Students"){
      setmembertype(true);
      setClickparent(false);
      setClickstudent(true);

    }
  }
  const parents = [
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

   const students = [
    {
      id: 10,
      first_name: 'Bareche',
      last_name: 'wassim',
  },
   {
      id: 11,
      first_name: 'Aichi',
      last_name: 'louai',
   },

   ];


    return (
        <div style={{width:'280px',backgroundColor:'white',marginTop:'65px',
        height:'fit-content',padding:'15px'}} >
          <div className="divmemberhead" >
            <div style={{display:'flex',alignItems:'center',gap:'4px'}}> <GroupsOutlinedIcon/> <span  className="mainspansm" >{t('members')}</span></div>
               <form>{inputVisible && (
                 <div>
                  <input type="text" className="searchinput" />
                  </div>
                )}</form>
            <div>  <IconButton onClick={toggleInputVisibility}> <SearchOutlinedIcon/></IconButton>  </div>
           </div>
           <div className="divselect" >
            <button className={clickparent ? "selectbtn" : "noselectbtn" } onClick={()=>changeType("Parents")}>{t('parent')} ({parents.length})</button>
            <button className={clickstudent ?  "selectbtn" : "noselectbtn"} onClick={()=>changeType("Students")}>{t('students')} ({students.length})</button>
           </div>

           <div className="body">
            { membertype ==false ? parents.map((parent) => (
                 <ContactItem  key={parent.id} contact={parent} />
                )) : students.map((student) => (
                  <ContactItem  key={student.id} contact={student} />
                ))
              }
           </div>
      </div>
    )
}

export default Members
