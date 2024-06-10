import Body from "../ui/Body";
import ChildrenTable from "../utlis/ChildrenTable";
import { useQuery } from "@tanstack/react-query"; // Assuming you're using tanstack/react-query
import { getStudents } from "../services/apiStudents";
import Loading from "../utlis/Loading";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import { deepOrange } from "@mui/material/colors";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { useMutation } from "@tanstack/react-query"; // Import useMutation
import { toast } from "react-hot-toast"; // Import toast
import { deleteStudent } from "../services/apiStudents";
import { updateStudent } from "../services/apiStudents";
import { AddStudent } from "../services/apiStudents";
import { useRef } from "react";
import Popup from "../utlis/Popup";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { FaChildren } from "react-icons/fa6";
import ConfirmationModal from "../utlis/ConfirmationModal";

function Children() {
  const drawerWidth = 300;
  const columns = [
    { id: "profile_picture", label: "Profile Picture", minWidth: 170 },
    { id: "first_name", label: "First Name", minWidth: 170 },
    { id: "last_name", label: "Last Name", minWidth: 100 },
    { id: "grade_level", label: "Grade Level", minWidth: 170, align: "right" },
    { id: "manage", label: "Manage", minWidth: 170, align: "right" }, // Add a column for manage buttons
  ];

  function createData(
    id,
    first_name,
    last_name,
    grade_level,
    profile_picture,
    manage
  ) {
    return { id, first_name, last_name, grade_level, profile_picture, manage };
  }

  let rows = [];

  const [edit, setedit] = useState(null);

  const first_name = useRef(null);
  const last_name = useRef(null);
  const grade_level = useRef(null);

  const [showpopup, setshowpopup] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false);

  const funcshowPopup = () => {
    setshowpopup(true);
  };

  const closeshowPopup = () => {
    setshowpopup(false);
  };

  const {
    isLoading,
    data: students,
    error,
  } = useQuery(["students"], getStudents);

  const queryClient = useQueryClient();

  const { mutate: deletestu, isLoading: Loadingdelete } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (data) => {
      toast.success("you delete a child successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("students");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: editstu, isLoading: LoadingEdit } = useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
      toast.success("you edit a child successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("students");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: addstudent, isLoading: LoadingAdd } = useMutation({
    mutationFn: AddStudent,
    onSuccess: (data) => {
      toast.success("you add new child successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("students");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  function handlEdit(member) {

    setedit(member);
    funcshowPopup();
  }
  function handlAddstu() {
    setedit(null);
    funcshowPopup();
  }
  function handldelet(member) {
    setedit(member);
    setshowconfirm(true);
    
  }
  function handlesubmit() {
    const data = new FormData();
    data.append("first_name", first_name.current.value);
    data.append("last_name", last_name.current.value);
    data.append("grade_level", grade_level.current.value);
    data.append("relation", "parent");
    if (edit) {
      editstu({ id: edit.id, data: data });
    } else {
      addstudent(data);
    }
  }

  function showconfirmpopup(){
    setshowconfirm(true);
  }
  

  rows = students.data.map((member) => {
    const manageButtons = (
      <div>
        <IconButton onClick={() => handlEdit(member)}>
          <FaEdit />
        </IconButton>
        <IconButton onClick={() => handldelet(member)}>
          <MdDelete />
        </IconButton>
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
    // <Body drawerWidth={drawerWidth}>
      <div style={{ marginTop: "90px", width: "100%" }}>
        <Button
          onClick={handlAddstu}
          sx={{ float: "right", marginBottom: "5px" }}
          variant="contained"
        >
          Add Child
        </Button>
        <ChildrenTable columns={columns} rows={rows} />

        {showpopup && (
          <Popup
            funcshowPopup={funcshowPopup}
            closeshowPopup={closeshowPopup}
            title={edit != null ? "Edit Child" : "Add Child"}
            url={"../../public/Children.png"}
          >
            <TextField
              defaultValue={edit?.first_name}
              inputRef={first_name}
              variant="outlined"
              label="first_name"
            ></TextField>
            <TextField
              defaultValue={edit?.last_name}
              inputRef={last_name}
              variant="outlined"
              label="last_name"
            ></TextField>
            <TextField
              defaultValue={edit?.grade_level}
              inputRef={grade_level}
              variant="outlined"
              label="grade_level"
            ></TextField>

            <Button
              color="primary"
              variant="contained"
              onClick={handlesubmit}
              disabled={LoadingEdit || LoadingAdd}
            >
              {LoadingEdit ? "Edit..." : "Save"}
            </Button>
          </Popup>
        )}
        { 
        showconfirm && (
          <ConfirmationModal
            open={showconfirmpopup}
            message="Are you sure you want to delete this child?"
            onConfirm={() => {
              deletestu(edit.id);
              setshowconfirm(false);
            }}
            onCancel={() => {
              setshowconfirm(false);
            }}
          />
        )

        }
      </div>
    // </Body>
  );
}

export default Children;
