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
import { useTranslation } from "react-i18next";
  
  function Stats({ Members}) {
    console.log(Members)
    const teacher=Members.filter((member)=>member.role==="teacher");
    const parents=Members.filter((member)=>member.role==="parent");
    const admin=Members.filter((member)=>member.role==="admin");
    const {t}=useTranslation();
   
    return (
      <>
         <Stat
          title={t("members")}
          color="blue"
          icon={<FaPeopleGroup />}
          value={Members.length}
        />
        <Stat
          title={t("teacher")}
          color="green"
          icon={<GiTeacher />}
          value={teacher.length}
        />
        <Stat
          title={t("parent")}
          color="indigo"
          icon={<RiParentFill />}
          value={parents.length}
        />
        <Stat
          title={t("Admins")}
          color="yellow"
          icon={<RiAdminFill />}
          value={admin.length}
        />
      </>
    );
  }
  
  export default Stats;
  