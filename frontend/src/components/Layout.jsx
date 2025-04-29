import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { shouldHideFooter } from '../utils/layoutUtils';

function Layout() {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register', '/admin/login'].includes(pathname);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden' // Prevent horizontal scroll
    }}>
      {isAuthPage && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/2156719.jpg)',
          backgroundSize: {
            xs: 'cover',
            sm: 'cover'
          },
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#2C2E43',
          height: '100vh',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(44, 46, 67, 0.6)',
            backdropFilter: 'blur(3px)',
            '@media (min-width: 600px)': {
              display: 'none'  // Hide overlay on larger screens
            }
          }
        }} />
      )}
      <Navbar sx={{ 
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: isAuthPage ? 'transparent' : '#2C2E43'
      }} />
      <Container 
        component="main" 
        maxWidth={false} 
        disableGutters
        sx={{ 
          flex: 1,
          position: 'relative',
          zIndex: 1,
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 2, sm: 3, md: 4 },
          '@media (max-width: 600px)': {
            maxWidth: '100%',
            overflow: 'hidden'
          }
        }}
      >
        <Outlet />
      </Container>
      {!shouldHideFooter(pathname) && <Footer />}
    </Box>
  );
}

export default Layout;
