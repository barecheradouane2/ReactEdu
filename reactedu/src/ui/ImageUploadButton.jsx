
// import Button from '@mui/material/Button';
import { useRef } from 'react';

function ImageUploadButton({children,setressource,ressource,setimgfile,setposttype}) {
    
    const imgInputRef = useRef(null);
    const handleButtonClick = () => {
        if (imgInputRef.current) {
            imgInputRef.current.click();
            setposttype('img');
        }
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
       
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
    
             
       let ressoursefilter=ressource.filter((item)=>item.type=='img');
        setressource(prevImages => [...ressoursefilter, ...urls.map(url => ({ type: 'img', url: url }))]);
        setimgfile( (prev)=>[...prev,...files]);
        
       
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
