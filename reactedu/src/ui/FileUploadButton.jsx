// import { Button } from '@mui/material';
import { useRef } from "react";

function FileUploadButton({ onChange, children, setattachment }) {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const files = event.target.files;

    // Create an array to store the file objects
    const newAttachments = [];

    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Add the file object to the array
      newAttachments.push(file);
    }

    // Update the state by concatenating the new array of attachments with the existing array
    setattachment((prevAttachments) => [
      ...prevAttachments,
      ...newAttachments,
    ]);

    // Call the onChange prop with the selected files
    onChange(files);
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <label htmlFor="contained-button-file">
        {/* <Button sx={{color:'#666666',width:'fit-content'}} component="span">
                    {children}
                </Button> */}
        <button
          style={{ color: "#666666" }}
          onClick={handleButtonClick}
          className="buttonfile"
        >
          {children}
        </button>
      </label>
    </div>
  );
}

export default FileUploadButton;
