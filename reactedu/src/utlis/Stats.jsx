// import {
//     HiOutlineBanknotes,
//     HiOutlineUserGroup ,
//     HiOutlineCalendarDays,
//     HiOutlineChartBar,
//   } from "react-icons/hi2";
  import { GiTeacher } from "react-icons/gi";
  import { RiParentFill } from "react-icons/ri";
  import { FaPeopleGroup } from "react-icons/fa6";
  import { RiAdminFill } from "react-icons/ri";



  import Stat from "./Stat";
  
  function Stats({ Members}) {
    console.log(Members)
    const teacher=Members.filter((member)=>member.role==="teacher");
    const parents=Members.filter((member)=>member.role==="parent");
    const admin=Members.filter((member)=>member.role==="admin");
   
    return (
      <>
         <Stat
          title="Members"
          color="blue"
          icon={<FaPeopleGroup />}
          value={Members.length}
        />
        <Stat
          title="Teachers"
          color="green"
          icon={<GiTeacher />}
          value={teacher.length}
        />
        <Stat
          title="Parents"
          color="indigo"
          icon={<RiParentFill />}
          value={parents.length}
        />
        <Stat
          title="Admin"
          color="yellow"
          icon={<RiAdminFill />}
          value={admin.length}
        />
      </>
    );
  }
  
  export default Stats;
  