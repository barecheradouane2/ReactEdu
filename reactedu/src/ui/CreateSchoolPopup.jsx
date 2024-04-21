import React, { useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputFileUpload from "./InputFileUpload";
import { CreateSchool } from "../services/apiSchool";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateSchool } from "../services/apiSchool";

function CreateSchoolPopup({showCreatePopup, closeshowCreatePopup,school}) {
    const schoolname = useRef(null);
    const schooladdress = useRef(null);
    // const schoolimg = useRef(null);

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: CreateSchool,
        onSuccess: () => {
            console.log("School created successfully");
            queryClient.invalidateQueries("schools");
        },
        onError: () => {
            console.log("Error creating school");
        }
    });
    const { mutate:update ,isLoading: isUpdating } = useMutation({
        mutationFn: UpdateSchool,
        onSuccess: () => {
            console.log("School updated  successfully");
            queryClient.invalidateQueries("schools");
        },
        onError: () => {
            console.log("Error creating school");
        }
    });

    const onSubmit = () => {
        const payload = {
            name: schoolname.current.value,
            address: schooladdress.current.value,
            image: "",
        };
        mutate(payload);
    };
    const onUpdate = () => {
        const payload = {
            id:school.id,
            name: schoolname.current.value,
            address: schooladdress.current.value,
            image: "",
        };
        update(payload);
    }

    return (
        <Dialog 
            open={showCreatePopup} 
            onClose={closeshowCreatePopup} 
            fullWidth 
            maxWidth="sm"
        >
            <DialogTitle> {school!=null?'Edit School':'Create School'}  <IconButton onClick={closeshowCreatePopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <div className="flex justify-center"> <img src="../../public/createschool.jpg" alt="school" style={{width:'200px',height:'200px'}}></img></div>
                    
                    <TextField  defaultValue={school!=null?school.name:''} inputRef={schoolname} variant="outlined" label="Name"></TextField>
                    <TextField  defaultValue={school!=null?school.address:''} inputRef={schooladdress} variant="outlined" label="Address"></TextField>
                    {/* <InputFileUpload inputRef={schoolimg}/> */}
                  
                    {school!=null?
                      <Button color="primary" variant="contained" onClick={onUpdate} disabled={isLoading}>
                       {isUpdating ? "Updating..." : "Save"}
                  </Button>
                    :  <Button color="primary" variant="contained" onClick={onSubmit} disabled={isLoading}>
                    {isLoading ? "Creating..." : "CREATE"}
                </Button>}
                   
                </Stack>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default CreateSchoolPopup;
