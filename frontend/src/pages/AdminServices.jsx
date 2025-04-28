import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../utils/api';
import Notification from '../components/Notification';

function AdminServices() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
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

  const handleAddService = async () => {
    try {
      console.log('Adding service:', newService); // Debug log
      const response = await api.post('/services', { name: newService }); // Remove /api prefix
      console.log('Service added:', response.data); // Debug log
      
      setNewService('');
      loadServices();
      setNotification({
        open: true,
        message: 'Service added successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding service:', error.response?.data);
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to add service',
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Manage Services</Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="New Service Name"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddService}
          disabled={!newService.trim()}
        >
          Add Service
        </Button>
      </Box>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
