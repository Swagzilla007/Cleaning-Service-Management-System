import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';
import api from '../utils/api';

function Services() {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [newService, setNewService] = useState('');
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      await api.post('/services', { name: newService });
      setNewService('');
      loadServices();
      setNotification({
        open: true,
        message: 'Service added successfully',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to add service',
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Our Services</Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" m={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {user && (
            <Box sx={{ mt: 4, mb: 2 }}>
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
          )}
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
        </>
      )}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
}

export default Services;
