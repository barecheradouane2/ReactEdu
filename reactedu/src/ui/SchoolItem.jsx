import DemoPaper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function SchoolItem({school}) {
    return (
        <Link to={`/schools/${encodeURIComponent(school.name)}`} style={{ textDecoration: 'none' }}> {/* Wrap with Link */}
          <DemoPaper
            variant="elevation"
            sx={{
              padding: '10px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ width: '100%', height: '50px' }}>
              <img src={school.image} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            </Box>
    
            <Typography variant='h6'>{school.name}</Typography>
            <Typography variant='h7'>{school.address}</Typography>
            <Typography variant='h8'>Admin by {school.id}</Typography>
          </DemoPaper>
        </Link>
      );
}

export default SchoolItem
