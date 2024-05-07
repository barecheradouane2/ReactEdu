// import { Button } from '@mui/material';
import { useRef } from "react";

function FileUploadButton({ children, setattachment, setposttype,ressource, setressource}) {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setposttype('file');
    }
  };
  const handleFileChange = (event) => {
    const files = event.target.files;


     let ressoursefilter=ressource.filter((item)=>item.type=='file');

     setressource([...ressoursefilter, { type: 'file', url: files[0] }]); // Adjusted to correctly add each URL as an object
    
    console.log(ressource);

  };

  return (
    <div style={{marginRight:'25px'}}>
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
         <button style={{color:'#666666',width:'fit-content',display:'flex',gap:'5px',alignItems:'center'}} className='buttonfile'  onClick={handleButtonClick}>
                    {children}
                </button>
      </label>
    </div>
  );
}

export default FileUploadButton;
