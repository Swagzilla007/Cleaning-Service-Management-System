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
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Customer Login</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
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
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Admin? <Link to="/admin/login">Login here</Link>
        </Typography>
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
