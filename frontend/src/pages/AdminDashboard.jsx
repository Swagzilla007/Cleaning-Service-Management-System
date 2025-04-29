import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import api from '../utils/api';
import Notification from '../components/Notification';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    try {
      const { data } = await api.get('/admin/bookings');
      setBookings(data);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to load bookings',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Typography variant="h6" gutterBottom>All Bookings</Typography>
      
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
                  <Typography color="textSecondary">
                    Booked by: {booking.username}
                  </Typography>
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

export default AdminDashboard;
