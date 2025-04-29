import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

function Layout() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%'
    }}>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/images/2156719.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />
      <Navbar sx={{ 
        position: 'sticky',
        top: 0,
        zIndex: 10
      }} />
      <Container 
        component="main" 
        maxWidth={false} 
        disableGutters
        sx={{ 
          flex: 1,
          position: 'relative',
          zIndex: 1,
          p: 0
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
