import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../utils/api';
import Notification from '../components/Notification';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    date_time: null,
    service_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    loadBookings();
    loadServices();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings');
      console.log('Loaded bookings:', data); // Debug log
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error.response?.data); // Debug log
      setNotification({
        open: true,
        message: 'Failed to load bookings',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

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
      const formattedData = {
        ...formData,
        date_time: formData.date_time ? formData.date_time.toISOString() : null,
        service_id: parseInt(formData.service_id, 10)
      };

      console.log('Sending booking data:', formattedData); // Debug log
      const response = await api.post('/bookings', formattedData);
      console.log('Booking response:', response.data); // Debug log

      await loadBookings(); // Reload bookings after successful creation
      resetForm();
      setNotification({
        open: true,
        message: 'Booking created successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Booking error:', error.response?.data); // Debug log
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to create booking',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      loadBookings();
      setNotification({
        open: true,
        message: 'Booking deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to delete booking',
        severity: 'error'
      });
    }
  };

  const handleEdit = (booking) => {
    setFormData({
      customer_name: booking.customer_name,
      address: booking.address,
      date_time: new Date(booking.date_time),
      service_id: booking.service_id
    });
    setEditingId(booking.id);
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      address: '',
      date_time: null,
      service_id: ''
    });
    setEditingId(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {editingId ? 'Edit Booking' : 'Create Booking'}
      </Typography>
      {/* Form section */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Name"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateTimePicker
              required
              label="Date and Time"
              value={formData.date_time}
              onChange={(newValue) => setFormData({ ...formData, date_time: newValue })}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              select
              label="Service"
              value={formData.service_id}
              onChange={(e) => setFormData({ ...formData, service_id: parseInt(e.target.value, 10) })}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {editingId ? 'Update' : 'Create'} Booking
        </Button>
        {editingId && (
          <Button onClick={resetForm} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        )}
      </Box>
      {/* Bookings list */}
      <Typography variant="h4" gutterBottom>Your Bookings</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" m={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{booking.customer_name}</Typography>
                  <Typography color="textSecondary">{booking.address}</Typography>
                  <Typography>
                    {new Date(booking.date_time).toLocaleString()}
                  </Typography>
                  <Typography color="textSecondary">
                    Service: {booking.service_name}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <IconButton onClick={() => handleEdit(booking)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(booking.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

export default Bookings;
