import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BookingsIcon from '@mui/icons-material/BookOnline';
import api from '../utils/api';
import Notification from '../components/Notification';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1600px', mx: 'auto' }}>
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              bgcolor: 'rgba(44, 46, 67, 0.05)',
              borderRadius: 2,
              boxShadow: 'none',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(44, 46, 67, 0.12)'
              }
            }}
          >
            <CardContent sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <BookingsIcon sx={{ fontSize: 40, color: '#FBD64A' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C2E43' }}>
                  {bookings.length}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Total Bookings</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more stat cards as needed */}
      </Grid>

      {/* Bookings List */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          borderRadius: 2,
          bgcolor: 'rgba(44, 46, 67, 0.02)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            color: '#2C2E43',
            fontWeight: 700,
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
          Recent Bookings
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" m={4}>
            <CircularProgress sx={{ color: '#FBD64A' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {bookings.map((booking, index) => (
              <Grid item xs={12} md={6} key={booking.id}>
                <Card 
                  sx={{
                    borderRadius: 2,
                    border: '1px solid rgba(44, 46, 67, 0.1)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s`,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(44, 46, 67, 0.12)',
                      borderColor: '#FBD64A'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <PersonIcon sx={{ color: '#2C2E43' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {booking.customer_name}
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon sx={{ color: '#2C2E43', fontSize: '1.2rem' }} />
                          <Typography variant="body1">{booking.address}</Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EventIcon sx={{ color: '#2C2E43', fontSize: '1.2rem' }} />
                          <Typography variant="body1">
                            {new Date(booking.date_time).toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CleaningServicesIcon sx={{ color: '#FBD64A', fontSize: '1.2rem' }} />
                          <Typography 
                            sx={{ 
                              color: '#2C2E43',
                              fontWeight: 500
                            }}
                          >
                            {booking.service_name}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
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

export default AdminDashboard;
