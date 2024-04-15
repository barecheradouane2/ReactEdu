

import { useRef } from 'react';
function VideoUploadButton({ onChange,children ,setvideofile,setressource}) {

    const videoInputRef = useRef(null);
    const handleButtonClick = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click();
        }
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
      
        setressource(prevImages => [...prevImages, ...urls.map(url => ({ type: 'vid', url: url }))]); // Adjusted to correctly add each URL as an object with type 'vid'
        setvideofile([...files]);
        onChange(files);
    };
    

    return (
        <div style={{flexGrow:'1'}} >
            <input
                accept="video/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
                ref={videoInputRef}
            />
            <label htmlFor="contained-button-file">
            <button style ={{color:'#666666',width:'fit-content'}}  className='buttonfile' onClick={handleButtonClick}>
                    {children}
                </button>
            </label>
        </div>
    );
}

export default VideoUploadButton;
