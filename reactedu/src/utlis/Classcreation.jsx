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

function Classcreation({
  school,
  classname,
  grade_level,
  subject,
  onSubmit,
  onUpdate,
  isUpdating,
  isLoading,
}) {
  return (
    <>
      <form
        onSubmit={school != null ? onUpdate : onSubmit}
        className="flex flex-col gap-3"
      >
        <TextField
          defaultValue={school != null ? school.name : ""}
          inputRef={classname}
          variant="outlined"
          label="classname"
          required={true}
        />
        <TextField
          defaultValue={school != null ? school.grade : ""}
          inputRef={grade_level}
          variant="outlined"
          label="grade_level"
        />
        <TextField
          defaultValue={school != null ? school.subject : ""}
          inputRef={subject}
          variant="outlined"
          label="subject"
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isUpdating}
        >
          {school != null
            ? (isUpdating
              ? "Updating..."
              : "Save")
            : (isLoading
            ? "Creating..."
            : "CREATE")}
        </Button>
      </form>
    </>
  );
}

export default Classcreation;
