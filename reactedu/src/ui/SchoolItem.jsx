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

function SchoolItem({ school, setschools }) {
  const queryClient = useQueryClient();

  const { mutate:deleteSchool } = useMutation({
    mutationFn: DeleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries("schools");
    },
  });


  

  // const { mutate, isLoading } = useMutation({
  //     mutationFn: DeleteSchool,
  //     onSuccess: () => {

  //         setschools(prevSchools => prevSchools.filter(item => item.id !== school.id));
  //         toast.success("School Deleted Successfully");
  //         queryClient.invalidateQueries("schools");
  //     },
  //     onError: () => {
  //         console.log("Failed to delete school");
  //     }
  // });

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
      <EditDelteMenue  deleteSchool={deleteSchool} school={school} setschools={setschools} />

      <Link
        to={`/schools/${encodeURIComponent(school.name)}`}
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
            Members :{school.members_count}
          </Typography>
        </Box>
      </Link>
    </DemoPaper>
  );
}

export default SchoolItem;
