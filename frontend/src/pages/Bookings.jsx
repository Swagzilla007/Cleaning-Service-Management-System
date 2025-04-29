import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, MenuItem, IconButton, CircularProgress, Paper } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addMinutes } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';  
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { keyframes } from '@emotion/react';
import api from '../utils/api';
import Notification from '../components/Notification';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

      let response;
      if (editingId) {
        response = await api.put(`/bookings/${editingId}`, formattedData);
      } else {
        response = await api.post('/bookings', formattedData);
      }

      setNotification({
        open: true,
        message: `Booking ${editingId ? 'updated' : 'created'} successfully`,
        severity: 'success'
      });
      await loadBookings();
      resetForm();
    } catch (error) {
      console.error('Booking error:', error);
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Failed to save booking',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
        return;
    }

    try {
        const response = await api.delete(`/bookings/${id}`);
        if (response.status === 200) {
            setNotification({
                open: true,
                message: 'Booking deleted successfully',
                severity: 'success'
            });
            await loadBookings();
        }
    } catch (error) {
        console.error('Delete error:', error.response?.data);
        setNotification({
            open: true,
            message: error.response?.data?.message || 'Failed to delete booking',
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
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Form Section */}
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          mb: 6,
          borderRadius: 2,
          backgroundColor: 'rgba(44, 46, 67, 0.02)',
          backdropFilter: 'blur(10px)',
          animation: `${fadeIn} 0.5s ease-out`
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
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
          {editingId ? 'Edit Booking' : 'Create Booking'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Name"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
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
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
            <Grid item xs={12} md={6}>
              <DateTimePicker
                required
                label="Date and Time"
                value={formData.date_time}
                onChange={(newValue) => setFormData({ ...formData, date_time: newValue })}
                minDate={new Date()} // Only prevent past dates
                format="dd/MM/yyyy hh:mm a"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
                sx={{ 
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FBD64A',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FBD64A',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-focused': {
                      color: '#2C2E43'
                    }
                  },
                  '& .MuiPickersDay-root': {
                    '&.Mui-selected': {
                      backgroundColor: '#2C2E43',
                      color: '#FBD64A',
                      '&:hover': {
                        backgroundColor: '#FBD64A',
                        color: '#2C2E43'
                      }
                    }
                  },
                  '& .MuiClock-pin, & .MuiClockPointer-root': {
                    backgroundColor: '#2C2E43'
                  },
                  '& .MuiClockPointer-thumb': {
                    backgroundColor: '#FBD64A',
                    border: '2px solid #2C2E43'
                  }
                }}
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
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FBD64A',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FBD64A',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    '&.Mui-focused': {
                      color: '#2C2E43'
                    }
                  },
                  '& .MuiSelect-select': {
                    padding: '16.5px 14px'
                  }
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return <em style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Choose a service type</em>;
                    }
                    return services.find(s => s.id === selected)?.name;
                  }
                }}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
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
                {editingId ? 'Update' : 'Create'} Booking
              </Button>
              {editingId && (
                <Button 
                  onClick={resetForm}
                  sx={{ 
                    mt: 2, 
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

      {/* Bookings List Section */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h4" 
          gutterBottom
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
          Your Bookings
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
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid rgba(44, 46, 67, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s`,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(44, 46, 67, 0.12)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#2C2E43', fontWeight: 600, mb: 2 }}>
                      {booking.customer_name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                      <Typography 
                        sx={{ 
                          color: 'rgba(44, 46, 67, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.95rem'
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: '1.2rem', color: '#2C2E43' }} />
                        {booking.address}
                      </Typography>
                      
                      <Typography 
                        sx={{ 
                          color: 'rgba(44, 46, 67, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.95rem'
                        }}
                      >
                        <CalendarTodayIcon sx={{ fontSize: '1.2rem', color: '#2C2E43' }} />
                        {new Date(booking.date_time).toLocaleString()}
                      </Typography>
                      
                      <Typography 
                        sx={{ 
                          color: '#FBD64A',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.95rem'
                        }}
                      >
                        <CleaningServicesIcon sx={{ fontSize: '1.2rem' }} />
                        {booking.service_name}
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      mt: 2,
                      pt: 2,
                      borderTop: '1px solid rgba(44, 46, 67, 0.1)',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1
                    }}>
                      <IconButton 
                        onClick={() => handleEdit(booking)}
                        sx={{ 
                          color: '#2C2E43',
                          '&:hover': { 
                            color: '#FBD64A',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(booking.id)}
                        sx={{ 
                          color: '#2C2E43',
                          '&:hover': { 
                            color: '#FF5C5C',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
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
        )}
      </Box>
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
