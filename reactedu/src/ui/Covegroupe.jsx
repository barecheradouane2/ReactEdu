import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useTranslation } from "react-i18next";

function Covegroupe({classinfo}) {
  console.log("this is the classinfo",classinfo);
  const {t}=useTranslation();
  return (
    <div className="Covegroupe" style={{ marginTop: "65px" }}>
      <div>
      <img src="/Classroom-Procedures-min%201.png" alt="Classroom Procedures" width="100%" />

      </div>
      <div className="head">
        <AvatarGroup max={4}>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        </AvatarGroup>
      </div>

      <div className="body">
        <span className="mainspan">{classinfo[0].name +" " +classinfo[0].grade}</span>
      </div>
      <div className="botom">
        <span className="maintitle">
          {t('admins')}  {t('by')} <span className="owner">{classinfo[0].teacher_first_name+classinfo[0].teacher_last_name}</span>{" "}
        </span>
      </div>
    </div>
  );
}

export default Covegroupe;
