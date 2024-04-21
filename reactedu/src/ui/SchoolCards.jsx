import { Grid } from "@mui/material"
//import { s } from "vite/dist/node/types.d-aGj9QkWt"
import SchoolItem from "./SchoolItem"
import CreateSCard from "../ui/CreateSCard"

import SearchSchool from "./SearchSchool";

import CreateSchoolPopup from "./CreateSchoolPopup";
import SearchSchoolPopup from "./SearchSchoolPopup";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSchools } from "../services/apiSchool";

import JoinSchoolPopup from "../utlis/JoinSchoolPopup";

import {useStateContext} from "../context/ContextProvider";




function SchoolCards() {

    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);

     const [showJoinPopup, setShowJoinPopup] = useState(false);

     const {user} = useStateContext();
     

    
    const funcshowCreatePopup=()=>{
        setShowCreatePopup(true);
    }
    const closeshowCreatePopup=()=>{
        setShowCreatePopup(false);
    }

    const toggleSearchPopup = () => {
        setShowSearchPopup(!showSearchPopup);
      };
    
  const {data:x}= useQuery({
    queryKey: ['schools'],
    queryFn: getSchools
})

let schools=[];
if (user  !== null) {
    // User data and user.data exist, and user.data.schools is not null
     schools = user.schools
    // Proceed with further processing
  } 
//   const schools = [

//     {
//         id : 1,
//         name: "ثانوية محمد بوضياف",
//         address: "بلدية فرجيوة ولاية ميلة ",
//         image: "https://source.unsplash.com/random",
//         admin_id: 1

//     },
//     {

//         id : 2,
//         name: "ابتدائية عبد الرزاق ",
//         address: "فرجيوة -ميلة ",
//         image: "https://source.unsplash.com/random",
//         admin_id: 2

//     },
//     {
//         id : 3,
//         name: "متوسطة خليلي سماعيل ",
//         address: "فرجيوة -ميلة ",
//         image: "https://source.unsplash.com/random",
//         admin_id: 3
//     }
//   ];

    return (

        
        <Grid container spacing={2}  sx={{padding:'25px'}}>

           <Grid item xs={12} sm={6} md={4} lg={3}>
            <CreateSCard funcshowCreatePopup={funcshowCreatePopup} />
            <CreateSchoolPopup showCreatePopup={showCreatePopup}  closeshowCreatePopup={closeshowCreatePopup}/>
           </Grid>

           <Grid item xs={12} sm={6} md={4} lg={3}>
           <SearchSchool   toggleSearchPopup={toggleSearchPopup} >Search</SearchSchool   >
            <SearchSchoolPopup showSearchPopup={showSearchPopup} toggleSearchPopup={toggleSearchPopup}/>
           </Grid>

           <Grid item xs={12} sm={6} md={4} lg={3}>
            <SearchSchool   toggleSearchPopup={toggleSearchPopup} >Join</SearchSchool   >
            <JoinSchoolPopup showSearchPopup={showSearchPopup} toggleSearchPopup={toggleSearchPopup}/>
           </Grid>


           {schools.map(school => (
                <Grid item key={school.id} xs={12} sm={6} md={4} lg={3}>
                    <SchoolItem school={school} />
                </Grid>
            ))}

        </Grid>
    )
}

export default SchoolCards
