import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"
import { useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import {JoinSchoolWithCode} from "../services/apiSchoolRequest";

function JoinSchoolPopup({showSearchPopup,toggleSearchPopup}) {

    const Code = useRef(null);

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: JoinSchoolWithCode,
        onSuccess: () => {
            console.log("joined school successfully");
            queryClient.invalidateQueries("schools");
        },
        onError: () => {
            console.log("Error of join school");
        }
    });
    
    const onjoin = () => {
        const payload = {
            code: Code.current.value,
        };
        mutate(payload);
    }



    return (
        <Dialog 
            open={showSearchPopup} 
            onClose={toggleSearchPopup} 
            fullWidth 
            maxWidth="sm"
        >
            <DialogTitle> Join School   <IconButton onClick={toggleSearchPopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <div className="flex justify-center"> <img src="../../public/createschool.jpg" alt="school" style={{width:'200px',height:'200px'}}></img></div>
                    
                    <TextField  inputRef={Code}   variant="outlined" label="Code"></TextField>
                  
                    {/* <InputFileUpload inputRef={schoolimg}/> */}
                   
            
            
       
                  
                      <Button color="primary" variant="contained" onClick={()=>onjoin()} >
                       Join
                  </Button>
                    
             
                   
                </Stack>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default JoinSchoolPopup
