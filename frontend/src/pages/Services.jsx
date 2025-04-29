import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import WeekendIcon from '@mui/icons-material/Weekend';
import api from '../utils/api';
import Notification from '../components/Notification';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function Services() {
  const [services, setServices] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

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

  const getServiceIcon = (index) => {
    const Icon = [CleaningServicesIcon, HomeIcon, BusinessIcon, WeekendIcon][index % 4];
    return (
      <Icon 
        className="icon"
        sx={{ 
          fontSize: '3rem',
          color: '#2C2E43',
          transition: 'all 0.3s ease',
          mb: 2
        }}
      />
    );
  };

  return (
    <Box sx={{ 
      p: { xs: 3, md: 5 },
      maxWidth: '1400px',
      mx: 'auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(44, 46, 67, 0.02)',
          backdropFilter: 'blur(10px)',
          animation: `${fadeIn} 0.5s ease-out`,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#2C2E43',
            fontWeight: 800,
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '5px',
              backgroundColor: '#FBD64A',
              borderRadius: '2px'
            }
          }}
        >
          Our Services
        </Typography>

        <Grid 
          container 
          spacing={{ xs: 3, sm: 4, md: 5 }} 
          sx={{ 
            mt: 2,
            justifyContent: 'center',
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          {services.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={service.id}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card 
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  border: '1px solid rgba(44, 46, 67, 0.1)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s`,
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 24px rgba(44, 46, 67, 0.1)',
                    borderColor: '#FBD64A',
                    '& .icon': {
                      transform: 'scale(1.1) rotate(10deg)',
                      color: '#FBD64A'
                    },
                    '&::before': {
                      transform: 'scaleX(1)'
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: '#FBD64A',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'left'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    {getServiceIcon(index)}
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#2C2E43',
                        fontWeight: 600,
                        textAlign: 'center',
                        mb: 1
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(44, 46, 67, 0.7)',
                        textAlign: 'center',
                        fontSize: '0.95rem'
                      }}
                    >
                      Professional {service.name.toLowerCase()} services with guaranteed satisfaction
                    </Typography>
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

export default Services;
