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

import { JoinClassbyCode } from "../services/apiClass";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function JoinClassPopup({ showJoinPopup, toggleJoinPopup }) {
  const Code = useRef(null);
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { mutate: joinwithcode, isLoading } = useMutation({
    mutationFn: JoinClassbyCode,
    onSuccess: () => {
      toast.success("joined Class successfully");

    

      queryClient.invalidateQueries("Class");
      queryClient.invalidateQueries("schools");
    },
    onError: (error) => {
    
        console.log("************************", error.response.data.message);
        toast.error(error.response.data.message);
      
    },
  });

  const onjoin = () => {
    console.log(Code.current.value);
    const payload = {
      code: Code.current.value,
    };
    joinwithcode(payload);
  };

  return (
    <div>
      <div className="flex justify-center">
        {" "}
        <img
          src="../../public/ClassDefault.jpg"
          alt="school"
          style={{ width: "200px", height: "200px" }}
        ></img>
      </div>

      <div className="flex justify-content gap-2 mt-5">
        <TextField inputRef={Code} variant="outlined" label={t('code')}></TextField>

        {/* <InputFileUpload inputRef={schoolimg}/> */}

        <Button color="primary" variant="contained" onClick={() => onjoin()}>
          {t("join_class")}
        </Button>
      </div>
    </div>
  );
}

export default JoinClassPopup;
