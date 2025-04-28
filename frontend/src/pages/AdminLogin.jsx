import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Notification from '../components/Notification';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting admin login with:', credentials.username); // Debug log
      const { data } = await api.post('/users/admin/login', credentials);
      
      console.log('Admin login response:', data); // Debug log
      
      if (data.user && data.user.isAdmin) {
        login(data.user, data.token);
        navigate('/admin/services');
      } else {
        throw new Error('Not authorized as admin');
      }
    } catch (error) {
      console.error('Admin login error details:', {
        response: error.response?.data,
        status: error.response?.status
      });
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Invalid admin credentials',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Admin Username"
            margin="normal"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Login as Admin
          </Button>
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

export default AdminLogin;
