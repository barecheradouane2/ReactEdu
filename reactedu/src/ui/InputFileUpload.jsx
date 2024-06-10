
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function InputFileUpload({ref}) {

  const handleFileClick = () => {
    ref.current.click();
  };
  const { t } = useTranslation();
    return (
      <div>
      <input
        type="file"
        accept="image/*"
        ref={ref}
        style={{ display: 'none' }}
      />
      <Button variant="contained" component="span" onClick={handleFileClick}>
        {t("choose_image")}
      </Button>
    </div>
          
    )
}

export default InputFileUpload
