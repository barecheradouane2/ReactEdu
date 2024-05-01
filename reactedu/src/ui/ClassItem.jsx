
import DemoPaper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { DeleteClass } from "../services/apiClass";
import EditDelteMenue from "../utlis/EditDelteMenue";



function ClassItem({ mycalss, id }) {
    const queryClient = useQueryClient();

    console.log(mycalss.image);

    const { isLoading,mutate:deleteclass } = useMutation({
        mutationFn: DeleteClass,
        onSuccess: () => {
          queryClient.invalidateQueries("classes");
          queryClient.invalidateQueries("userData");
          toast.success("Class Deleted Successfully");
        },
      });

    return (
        <DemoPaper
        variant="elevation"
        sx={{
          padding: "10px",
          height: "200px",
  
          overflow: "hidden",
          position: "relative",
        }}
      >
      {  mycalss.teacher_id == id && <EditDelteMenue  deleteSchool={deleteclass} school={mycalss}  />} 
  
        <Link
          to={`/schools/${encodeURIComponent(mycalss.name)}`}
          style={{ textDecoration: "none" }}
        >
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
                    mycalss.image
                    ? `http://localhost:8000/storage/${mycalss.image}`
                    : "../../public/school.webp"
                }
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </Box>
  
            <Typography variant="h6">
              {mycalss.name.charAt(0).toUpperCase() + mycalss.name.slice(1)}
            </Typography>
            <Typography variant="h7" sx={{ obcity: "0.5" }}>
              {" "}
              Members :{mycalss.members_count}
            </Typography>
          </Box>
        </Link>
      </DemoPaper>
    )
}

export default ClassItem
