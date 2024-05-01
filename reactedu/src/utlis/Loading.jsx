import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size={80} /> {/* Set the size to 80 */}
    </div>
  );
}

export default Loading;
