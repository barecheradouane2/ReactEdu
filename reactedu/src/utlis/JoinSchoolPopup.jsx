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

import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { JoinSchoolWithCode } from "../services/apiSchoolRequest";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function JoinSchoolPopup({ showJoinPopup, toggleJoinPopup }) {
  const Code = useRef(null);
  const{t}=useTranslation();

  const queryClient = useQueryClient();
  //it work porperly

  const { mutate, isLoading } = useMutation({
    mutationFn: JoinSchoolWithCode,
    onSuccess: () => {
          
      
      toast.success("joined School successfully");
      queryClient.invalidateQueries("schools");
    },
    onError: (error) => {
     
        toast.error(error.response.data.message);
        console.log("Error of join Class:", error);
      
    },
  });

  const onjoin = () => {
    const payload = {
      code: Code.current.value,
    };
    mutate(payload);
  };

  return (
    <div>
      <div className="flex justify-center">
        {" "}
        <img
          src="../../public/createschool.jpg"
          alt="school"
          style={{ width: "200px", height: "200px" }}
        ></img>
      </div>
      <div className="flex justify-content gap-2">
        <TextField inputRef={Code} variant="outlined" label={t('code')}></TextField>

        {/* <InputFileUpload inputRef={schoolimg}/> */}

        <Button color="primary" variant="contained" onClick={() => onjoin()}>
         {t('join_school')}
        </Button>
      </div>
    </div>
  );
}

export default JoinSchoolPopup;
