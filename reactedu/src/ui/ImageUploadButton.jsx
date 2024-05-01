
// import Button from '@mui/material/Button';
import { useRef } from 'react';

function ImageUploadButton({ onChange ,children,setressource,setimgfile}) {
    
    const imgInputRef = useRef(null);
    const handleButtonClick = () => {
        if (imgInputRef.current) {
            imgInputRef.current.click();
        }
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
      
        setressource(prevImages => [...prevImages, ...urls.map(url => ({ type: 'img', url: url }))]); // Adjusted to correctly add each URL as an object
        setimgfile([...files]);
        // Call the onChange prop with the selected files
        onChange(files);
    };
    

    return (
        <div  style={{flexGrow:'1'}}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
                ref={imgInputRef}

            />
            <label htmlFor="contained-button-file">
            <button style={{color:'#666666',width:'fit-content',display:'flex',gap:'5px',alignItems:'center'}} className='buttonfile'  onClick={handleButtonClick}>
                    {children}
                </button>
            </label>
        </div>
    );
}

export default ImageUploadButton;
