import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ 
        backgroundColor: '#2C2E43',
        '& .MuiButton-root': {
          '&:hover': {
            backgroundColor: '#FBD64A',
            color: '#2C2E43'
          }
        }
      }}>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            color: 'white', 
            textDecoration: 'none',
            '&:hover': {
              color: '#FBD64A'
            }
          }}
        >
          Cleaning Service
        </Typography>
        <Box>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/bookings">Bookings</Button>
              <Button color="inherit" component={RouterLink} to="/services">Services</Button>
              {user.isAdmin && (
                <>
                  <Button color="inherit" component={RouterLink} to="/admin/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/admin/services">
                    Manage Services
                  </Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
              <Button color="inherit" component={RouterLink} to="/admin/login">Admin Login</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
