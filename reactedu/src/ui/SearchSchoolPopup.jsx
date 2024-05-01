import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { getSchools } from "../services/apiSchool";
import Loading from "../utlis/Loading";
import { JoinSchool } from "../services/apiSchool";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

function SearchSchoolPopup({ showSearchPopup, toggleSearchPopup }) {
  const [SearchSchoolId, setSearchSchoolId] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, data: allschools } = useQuery({
    querykey: ["schools"],
    queryFn: getSchools,
  });

  //it work properly i got the same message that i got from postman but i still get 403 status code in error situation
  const { mutate: handleJoinSchool } = useMutation({
    mutationFn: JoinSchool,
    onSuccess: (response) => {
     
      toast.success(response.message);

      queryClient.invalidateQueries("schools");
    },
    onError: (error) => {
     
      toast.error(error.response.data.error);
     
    },
  });

  const sendjoinschool = async (SearchSchoolId) => {
    const payload = {
      school_id: SearchSchoolId,
    };

    handleJoinSchool(payload);
  };

 

  if (isLoading) return <Loading />;
  return (
    <Dialog
      // fullScreen
      open={showSearchPopup}
      onClose={toggleSearchPopup}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {" "}
        Search School{" "}
        <IconButton onClick={toggleSearchPopup} style={{ float: "right" }}>
          <CloseIcon color="primary"></CloseIcon>
        </IconButton>{" "}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
        <Stack spacing={2} margin={2}>
          <div className="flex justify-center">
            {" "}
            <img
              src={"../../public/SchoolDefault.jpg"}
              alt="school"
              style={{ width: "200px", height: "150px" }}
            ></img>
          </div>
          <Autocomplete
            sx={{ width: "auto", margin: "10px 0px" }}
            disablePortal={false}
            id="combo-box-demo"
            options={allschools.data}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{
                  display: "flex",
                  flexDirection: "column ",
                  alignItems: "start",
                }}
              >
                <div>{option.name}</div>
                <div style={{ fontSize: "11px" }}>{option.address}</div>
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="School" />}
            onChange={(event, value) => {
              setSearchSchoolId(value.id);
            }}
          />

          <Button
            color="primary"
            variant="contained"
            onClick={() => sendjoinschool(SearchSchoolId)}
          >
            Join
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        {/* <Button color="success" variant="contained">Yes</Button>
                <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default SearchSchoolPopup;
