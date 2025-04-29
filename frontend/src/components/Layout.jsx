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
      width: '100%'
    }}>
      {isAuthPage && (
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
          p: 0
        }}
      >
        <Outlet />
      </Container>
      {!shouldHideFooter(pathname) && <Footer />}
    </Box>
  );
}

export default Layout;
