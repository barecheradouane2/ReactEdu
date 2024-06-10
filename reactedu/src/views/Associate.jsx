import React from "react";
import ChildrenTable from "../utlis/ChildrenTable";
import { useQuery } from "@tanstack/react-query"; // Assuming you're using tanstack/react-query
import { getStudents } from "../services/apiStudents";
import Loading from "../utlis/Loading";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import { deepOrange } from "@mui/material/colors";

import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { useMutation } from "@tanstack/react-query"; // Import useMutation
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { IoIosCheckbox } from "react-icons/io";

import { associatestudent } from "../services/apiStudents";
import { useLocation } from "react-router-dom";

function Associate() {
  const location = useLocation();
  const { school_id } = location.state;
  const columns = [
    { id: "profile_picture", label: "Profile Picture", minWidth: 170 },
    { id: "first_name", label: "First Name", minWidth: 170 },
    { id: "last_name", label: "Last Name", minWidth: 100 },
    { id: "grade_level", label: "Grade Level", minWidth: 170, align: "right" },
    { id: "Assoicate", label: "Assoicate", minWidth: 170, align: "right" }, // Add a column for manage buttons
  ];

  function createData(
    id,
    first_name,
    last_name,
    grade_level,
    profile_picture,
    Assoicate
  ) {
    return {
      id,
      first_name,
      last_name,
      grade_level,
      profile_picture,
      Assoicate,
    };
  }

  let rows = [];

  const {
    isLoading,
    data: students,
    error,
  } = useQuery(["students"], getStudents);

  const queryClient = useQueryClient();

  const { mutate: associate, isLoading: loadingassociate } = useMutation({
    mutationFn: associatestudent,
    onSuccess: (data) => {
      toast.success("you associate a child successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("students");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  function handleassociate(studentid) {
    const data = { id: school_id, mydata: { "student_id": studentid} };
    associate(data);
  }

  if (isLoading) {
    return <Loading />;
  }

  rows = students.data.map((member) => {
    const manageButtons = (
      <div>
        <Button variant="contained" color="success" onClick={()=>handleassociate(member.id)}>
          Associate
        </Button>
      </div>
    );

    return createData(
      member.id,
      member.first_name.charAt(0).toUpperCase() + member.first_name.slice(1),
      member.last_name.charAt(0).toUpperCase() + member.last_name.slice(1),
      member.grade_level,
      <Avatar
        alt={member.first_name}
        src={`http://localhost:8000/storage/${member.profile_picture}`}
      >
        {member.first_name.charAt(0).toUpperCase()}
      </Avatar>,
      manageButtons
    );
  });

  return (
    <div style={{ width: "100%", marginTop: "70px" }}>
      <ChildrenTable columns={columns} rows={rows} />
    </div>
  );
}

export default Associate;
