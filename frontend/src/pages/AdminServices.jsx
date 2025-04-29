import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, Paper, IconButton, CircularProgress } from '@mui/material';
import { keyframes } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';  // Fixed import path
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AddIcon from '@mui/icons-material/Add';
import api from '../utils/api';
import Notification from '../components/Notification';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: '' });  // Add formData state
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to load services',
        severity: 'error'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, formData);
        setNotification({
          open: true,
          message: 'Service updated successfully',
          severity: 'success'
        });
      } else {
        await api.post('/services', formData);
        setNotification({
          open: true,
          message: 'Service added successfully',
          severity: 'success'
        });
      }
      setFormData({ name: '' });
      setEditingId(null);
      loadServices();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to save service',
        severity: 'error'
      });
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({ name: service.name });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    try {
      await api.delete(`/services/${id}`);
      setNotification({
        open: true,
        message: 'Service deleted successfully',
        severity: 'success'
      });
      loadServices();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to delete service',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: '1400px', mx: 'auto' }}>
      {/* Add/Edit Service Form */}
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          mb: 6,
          borderRadius: 2,
          bgcolor: 'rgba(44, 46, 67, 0.02)',
          backdropFilter: 'blur(10px)',
          animation: `${fadeIn} 0.5s ease-out`
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#2C2E43',
            fontWeight: 700,
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: '#FBD64A',
              borderRadius: '2px'
            }
          }}
        >
          {editingId ? 'Edit Service' : 'Add New Service'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Service Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FBD64A',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FBD64A',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#2C2E43'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: '#2C2E43',
                  color: '#FBD64A',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#FBD64A',
                    color: '#2C2E43'
                  }
                }}
              >
                {editingId ? 'Update' : 'Add'} Service
              </Button>
              {editingId && (
                <Button 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: '' });
                  }}
                  sx={{ 
                    ml: 2,
                    color: '#2C2E43',
                    '&:hover': {
                      color: '#FBD64A',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Services List */}
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: 'rgba(44, 46, 67, 0.02)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#2C2E43',
            fontWeight: 700,
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: '#FBD64A',
              borderRadius: '2px'
            }
          }}
        >
          Manage Services
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={service.id}>
              <Card 
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(44, 46, 67, 0.1)',
                  transition: 'all 0.3s ease',
                  animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s`,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(44, 46, 67, 0.12)',
                    borderColor: '#FBD64A'
                  }
                }}
              >
                <CardContent sx={{ 
                  p: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CleaningServicesIcon sx={{ color: '#FBD64A', fontSize: '2rem' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {service.name}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton 
                      onClick={() => handleEdit(service)}
                      sx={{ 
                        color: '#2C2E43',
                        '&:hover': { 
                          color: '#FBD64A',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(service.id)}
                      sx={{ 
                        color: '#2C2E43',
                        '&:hover': { 
                          color: '#FF5C5C',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

export default AdminServices;
