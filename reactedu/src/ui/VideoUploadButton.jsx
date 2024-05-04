

import { useRef } from 'react';
function VideoUploadButton({ children ,setressource,ressource,setposttype}) {

    const videoInputRef = useRef(null);
    const handleButtonClick = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click();
        }
        setposttype('vid');
    };
    const handleFileChange = (event) => {
        const files = event.target.files;
        let ressoursefilter=ressource.filter((item)=>item.type=='vid');
        setressource([...ressoursefilter, { type: 'vid', url: files }]);
       
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
            <button style={{color:'#666666',width:'fit-content',display:'flex',gap:'5px',alignItems:'center'}} className='buttonfile'  onClick={handleButtonClick}>
                    {children}
                </button>
            </label>
        </div>
    );
}

export default VideoUploadButton;
