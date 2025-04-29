import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Divider, ListItemIcon } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookingsIcon from '@mui/icons-material/BookOnline';
import SettingsIcon from '@mui/icons-material/Settings';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { pathname } = useLocation();
  
  const isAuthPage = ['/login', '/register', '/admin/login'].includes(pathname);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    logout();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isAdmin = user?.isAdmin; // Use user context to check admin status

  const menuItems = isAdmin ? [
    { text: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
    { text: 'Manage Services', path: '/admin/services', icon: <SettingsIcon /> },
    { text: 'Bookings', path: '/admin/bookings', icon: <BookingsIcon /> }
  ] : [
    { text: 'Home', path: '/' },
    { text: 'Services', path: '/services' },
    { text: 'Book Now', path: '/bookings' }
  ];

  const drawer = (
    <Box
      sx={{
        width: 240,
        bgcolor: '#2C2E43',
        height: '100%',
        color: 'white',
        '& .MuiListItem-root': {
          my: 1,
          mx: 1,
          borderRadius: 1,
          transition: 'all 0.3s ease'
        }
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(251, 214, 74, 0.1)',
                transform: 'translateX(5px)',
                '& .MuiListItemText-primary, & .MuiListItemIcon-root': {
                  color: '#FBD64A'
                }
              },
              '&.Mui-selected': {
                bgcolor: 'rgba(251, 214, 74, 0.2)',
                '& .MuiListItemText-primary, & .MuiListItemIcon-root': {
                  color: '#FBD64A'
                }
              }
            }}
          >
            {item.icon && (
              <ListItemIcon sx={{ 
                color: 'white',
                minWidth: 40,
                transition: 'color 0.3s ease'
              }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1rem',
                  fontWeight: 500,
                  transition: 'color 0.3s ease'
                }
              }}
            />
          </ListItem>
        ))}
        <Divider sx={{ 
          my: 2, 
          bgcolor: 'rgba(251, 214, 74, 0.1)',
          mx: 2
        }} />
        <ListItem 
          button 
          onClick={handleLogoutClick}
          sx={{
            '&:hover': {
              bgcolor: 'rgba(255, 82, 82, 0.1)',
              transform: 'translateX(5px)',
              '& .MuiListItemText-primary, & .MuiListItemIcon-root': {
                color: '#ff5252'
              }
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '1.1rem',
                fontWeight: 500
              }
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ 
          backgroundColor: '#2C2E43',
          '& .MuiButton-root': {
            '&:hover': {
              backgroundColor: '#FBD64A',
              color: '#2C2E43'
            }
          }
        }}>
          {!isAuthPage && isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
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
          {!isAuthPage && !isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user ? (
                <>
                  {menuItems.map((item) => (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          color: '#FBD64A'
                        }
                      }}
                      startIcon={item.icon}
                    >
                      {item.text}
                    </Button>
                  ))}
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
          )}
          {isAuthPage && pathname !== '/admin/login' && (
            <Button
              component={Link}
              to="/admin/login"
              sx={{
                color: '#FBD64A',
                borderColor: '#FBD64A',
                '&:hover': {
                  bgcolor: '#FBD64A',
                  color: '#2C2E43',
                  borderColor: '#FBD64A',
                },
                ml: 'auto'
              }}
              variant="outlined"
            >
              Admin Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!isAuthPage && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              bgcolor: '#2C2E43'
            }
          }}
        >
          {drawer}
        </Drawer>
      )}

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
