import { Container, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

function Body({ drawerWidth, children }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Box
      sx={{
        px: '25px',
        py: '23px',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        marginLeft: isArabic ? { xs: 0 } : { xs: 0, sm: `${drawerWidth}px` },
        marginRight: isArabic ? { xs: 0, sm: `${drawerWidth}px` } : { xs: 0 },
      }}
    >
      {children}
    </Box>
  );
}

export default Body;
