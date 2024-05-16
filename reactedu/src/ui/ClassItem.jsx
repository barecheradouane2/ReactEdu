import DemoPaper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { DeleteClass } from "../services/apiClass";
import EditDelteMenue from "../utlis/EditDelteMenue";
import { FaPlus } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { JoinClassRequests } from "../services/apiClassRequests";
import { IoReloadSharp } from "react-icons/io5";
import ConfirmationModal from "../utlis/ConfirmationModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function ClassItem({ mycalss, id, where, is_member }) {
  const [open, setOpen] = useState(false);

  // const location = useLocation();
  // const { school_id } = location.state;
  const school_id=0;
  // const { schoolname, classname } = useParams();

  const { schoolname } = useParams();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // Your confirm logic here
    
    setOpen(false);
    handlejoinrequests({ class_id: mycalss.id });
  };

  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteclass } = useMutation({
    mutationFn: DeleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries("classes");
      queryClient.invalidateQueries("userData");
      toast.success("Class Deleted Successfully");
    },
  });

  const { isLoading: loadingjoin, mutate: joinclassrequests } = useMutation({
    mutationFn: JoinClassRequests,
    onSuccess: (data) => {
      queryClient.invalidateQueries("classes");
      queryClient.invalidateQueries("userData");
      toast.success(data.message);
    },
  });
  if (loadingjoin) return;
  function handlepending() {
    toast((t) => (
      <span>
        Your Request is Pending
        <button
          style={{
            backgroundColor: "var( --color-blue-700)",
            color: "white",
            padding: "5px 10px",
            marginLeft: "5px",
          }}
          onClick={() => toast.dismiss(t.id)}
        >
          ok
        </button>
      </span>
    ));
  }

  // function handlejoinrequests({ class_id: mycalss.id }) {
  //   handleOpen();

    
  //   joinclassrequests(payload);
    
    
  // }

  // console.log(mycalss.id);

  function  handlejoinrequests(payload) {
   

    
    joinclassrequests(payload);
    
    
  }

  return (
    <>
      <DemoPaper
        variant="elevation"
        sx={{
          padding: "10px",
          height: "220px",

          overflow: "hidden",
          position: "relative",
        }}
      >
        {mycalss.teacher_id == id && (
          <EditDelteMenue deleteSchool={deleteclass} school={mycalss.class} />
        )}

        {is_member != 1 ? (
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
            <Typography variant="h8" sx={{ color:"var(--color-blue-700)" }}>
              {" "}
              Admin :{mycalss.teacher_first_name.charAt(0).toUpperCase()+mycalss.teacher_first_name.slice(1) + " " + mycalss.teacher_last_name.charAt(0).toUpperCase()+mycalss.teacher_last_name.slice(1)}
            </Typography>
            <Typography variant="h7" sx={{ obcity: "0.5" }}>
              {" "}
              Members :{mycalss.members_count}
            </Typography>
            <Box>
              {is_member == 2 ? (
                <IconButton onClick={() => handlepending()}>
                  <IoReloadSharp />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => handleOpen()}
                >
                  <FaPlus />{" "}
                </IconButton>
              )}
            </Box>
          </Box>
        ) : (
          <Link
            to={`/schools/${schoolname}/${encodeURIComponent(mycalss.name)}`}
            style={{ textDecoration: "none" }}
            state={{ school_id:  school_id}}
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
              <Typography variant="h8" sx={{ color:"var(--color-blue-700)" }}>
              {" "}
              Admin :{mycalss.teacher_first_name.charAt(0).toUpperCase()+mycalss.teacher_first_name.slice(1) + " " + mycalss.teacher_last_name.charAt(0).toUpperCase()+mycalss.teacher_last_name.slice(1)}
            </Typography>
              <Typography variant="h7" sx={{ obcity: "0.5" }}>
                {" "}
                Members :{mycalss.members_count}
              </Typography>
              <Box></Box>
            </Box>
          </Link>
        )}
      </DemoPaper>
      <ConfirmationModal
        open={open}
        message="Are you sure you want to join this class"
        data={mycalss}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      />
    </>
  );
}

export default ClassItem;
