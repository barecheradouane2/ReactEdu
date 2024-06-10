import DemoPaper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import EditDelteMenue from "../utlis/EditDelteMenue";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteSchool } from "../services/apiSchool";
import { UpdateSchool } from "../services/apiSchool";
import { toast } from "react-hot-toast";
import Loading from "../utlis/Loading";
import { useTranslation } from "react-i18next";

function SchoolItem({ school,id,setdata, funcshowCreatePopup }) {
  const{t}=useTranslation();
  const queryClient = useQueryClient();

  const { isLoading,mutate:deleteSchool } = useMutation({
    mutationFn: DeleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries("schools");
      queryClient.invalidateQueries("userData");
      toast.success(t("delete_success"));
      setdata(null);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  
  let theid =school.id;
 
  


  // if(isLoading) return <Loading />;

  return (
    <DemoPaper
      variant="elevation"
      sx={{
        padding: "10px",
        height: "220px",

        overflow: "hidden",
        position: "relative",
      }}
    >
    {  school.admin_id == id && <EditDelteMenue funcshowCreatePopup={funcshowCreatePopup} setdata={setdata} deleteItem={deleteSchool} dataItem={school} type={'school'}  />} 

    {/* <Link to={{ pathname: , state: {} }}> */}

      <Link to={`/home/schools/${encodeURIComponent(school.name)}`}  state={{ school_id: theid}}>
    
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // gap: "15px",
          }}
        >
          <Box sx={{ width: "100px", height: "100px", objectFit: "cover" }}>
            <img
              src={
                school.image
                  ? `http://localhost:8000/storage/${school.image}`
                  : "../../public/school.webp"
              }
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </Box>

          <Typography variant="h6">
            {school.name.charAt(0).toUpperCase() + school.name.slice(1)}
          </Typography>
          <Typography variant="h7" sx={{ obcity: "0.5" }}>
            {" "}
            {t("members")} :{school.members_count}
          </Typography>
        </Box>
      </Link>
    </DemoPaper>
  );
}

export default SchoolItem;
