import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    logout();
    navigate('/login');
  };

  return (
    <>
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
                <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
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

      <Dialog 
        open={openLogoutDialog} 
        onClose={() => setOpenLogoutDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(44, 46, 67, 0.12)'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#2C2E43',
          fontWeight: 600,
          pb: 1
        }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'rgba(44, 46, 67, 0.7)' }}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={() => setOpenLogoutDialog(false)}
            sx={{ 
              color: '#2C2E43',
              '&:hover': { bgcolor: 'transparent', color: '#FBD64A' }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              bgcolor: '#2C2E43',
              color: '#FBD64A',
              '&:hover': {
                bgcolor: '#FBD64A',
                color: '#2C2E43'
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
