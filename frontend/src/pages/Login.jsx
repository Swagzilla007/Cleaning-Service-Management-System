import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Notification from '../components/Notification';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/login', credentials);
      console.log('Login response:', data); // Debug log
      login(data.user, data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error details:', {
        response: error.response?.data,
        status: error.response?.status
      });
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Login failed',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)', 
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 2,
          position: 'relative',
          backgroundColor: 'rgba(44, 46, 67, 0.85)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
          '& .MuiInputLabel-root': {
            color: '#FBD64A',
            '&.Mui-focused': {
              color: '#FBD64A'
            }
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(251, 214, 74, 0.5)'
            },
            '&:hover fieldset': {
              borderColor: '#FBD64A'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FBD64A'
            },
            '& input': {
              color: '#FFFFFF'
            }
          }
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}
        >
          Customer Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            size="large"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            size="large"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            size="large"
            sx={{ 
              mt: 3, 
              mb: 2,
              bgcolor: '#FBD64A',
              color: '#2C2E43',
              '&:hover': {
                bgcolor: 'rgba(251, 214, 74, 0.8)'
              }
            }}
          >
            Login
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              Don't have an account? {' '}
              <Link to="/register" style={{ color: '#FBD64A', textDecoration: 'none' }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
}

export default Login;
