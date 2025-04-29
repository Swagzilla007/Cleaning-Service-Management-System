import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';
import api from '../utils/api';
import Notification from '../components/Notification';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username.trim()) {
      setNotification({
        open: true,
        message: 'Username is required',
        severity: 'error'
      });
      return false;
    }

    if (formData.username.length < 3) {
      setNotification({
        open: true,
        message: 'Username must be at least 3 characters long',
        severity: 'error'
      });
      return false;
    }

    if (!formData.password) {
      setNotification({
        open: true,
        message: 'Password is required',
        severity: 'error'
      });
      return false;
    }

    if (formData.password.length < 6) {
      setNotification({
        open: true,
        message: 'Password must be at least 6 characters long',
        severity: 'error'
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      await api.post('/users/register', {
        username: formData.username,
        password: formData.password,
        isAdmin: formData.isAdmin
      });
      setNotification({
        open: true,
        message: 'Registration successful',
        severity: 'success'
      });
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Registration failed',
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
          },
          '& .MuiCheckbox-root': {
            color: '#FBD64A',
            '&.Mui-checked': {
              color: '#FBD64A'
            }
          },
          '& .MuiFormControlLabel-label': {
            color: '#FFFFFF'
          }
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}
        >
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            helperText="Minimum 3 characters"
            FormHelperTextProps={{ sx: { color: 'rgba(251, 214, 74, 0.7)' } }}
          />
          <TextField
            required
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            helperText="Minimum 6 characters"
            FormHelperTextProps={{ sx: { color: 'rgba(251, 214, 74, 0.7)' } }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isAdmin}
                onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                color="primary"
              />
            }
            label="Register as Admin"
            sx={{ mt: 1, mb: 2 }}
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
            Register
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              Already have an account? {' '}
              <Link to="/login" style={{ color: '#FBD64A', textDecoration: 'none' }}>
                Login here
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

export default Register;
