import { Box, Typography, Container, Grid, Card, CardContent, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import RecyclingIcon from '@mui/icons-material/Recycling'; 

// Define animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        height: '92vh', // Increased height
        width: '100%',
        position: 'relative',
        backgroundImage: 'url(/images/office-cleaning-services.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Parallax effect
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(44, 46, 67, 0.8)',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ 
          position: 'relative', 
          zIndex: 2,
          animation: `${fadeIn} 1s ease-out`
        }}>
          <Box sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              left: '0',
              width: '120px',
              height: '4px',
              backgroundColor: '#FBD64A',
              borderRadius: '2px'
            }
          }}>
            <Typography 
              variant="h2" 
              color="#FBD64A" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                animation: `${slideIn} 1s ease-out`,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                mb: 3
              }}
            >
              Professional Cleaning Services
            </Typography>
            <Typography 
              variant="h5" 
              color="white"
              sx={{ 
                maxWidth: '600px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                animation: `${fadeIn} 1s ease-out 0.5s both`,
                fontWeight: 500,
                letterSpacing: '1px'
              }}
            >
              Your Trusted Partner in Cleanliness and Hygiene
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#ffffff', py: 8, position: 'relative' }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              textAlign: 'center',
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#FBD64A',
                borderRadius: '2px'
              }
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#2C2E43',
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textTransform: 'uppercase',
                letterSpacing: '2px',
                mb: 1
              }}
            >
              Our Services
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'rgba(44, 46, 67, 0.8)',
                fontWeight: 500,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Exceptional Cleaning Solutions for Every Need
            </Typography>
          </Box>

          {/* Triangular Stack Layout */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            mt: 8
          }}>
            {/* Top Row - Single Card */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {renderFeatureCard(features[0], 0)}
            </Box>

            {/* Middle Row - Two Cards */}
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
              mt: -2 // Pull up to create overlap
            }}>
              {[1, 2].map((index) => (
                <Box key={index} sx={{ width: '33%' }}>
                  {renderFeatureCard(features[index], index)}
                </Box>
              ))}
            </Box>

            {/* Bottom Row - Three Cards */}
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
              mt: -2 // Pull up to create overlap
            }}>
              {[3, 4, 5].map((index) => (
                <Box key={index} sx={{ width: '33%' }}>
                  {renderFeatureCard(features[index], index)}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ 
        bgcolor: '#2C2E43', 
        color: 'white', 
        py: 12, // Increased padding
        position: 'relative',
        borderTop: '1px solid rgba(251, 214, 74, 0.1)',
        borderBottom: '1px solid rgba(251, 214, 74, 0.1)'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#FBD64A',
              mb: 4,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={3}>
            {[
              'Trained Professionals',
              'Eco-Friendly Solutions',
              'Flexible Scheduling',
              'Competitive Pricing',
              'Customer Satisfaction Guarantee',
              'Full Insurance Coverage'
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ 
                  p: 3,
                  bgcolor: 'rgba(44, 46, 67, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(251, 214, 74, 0.3)',
                  transition: 'all 0.3s ease',
                  animation: `${fadeIn} 1s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    bgcolor: 'rgba(44, 46, 67, 0.98)',
                    transform: 'scale(1.05)',
                    border: '1px solid rgba(251, 214, 74, 0.6)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2 
                  }}>
                    <StarIcon sx={{ 
                      color: '#FBD64A',
                      fontSize: 28,
                      animation: `${fadeIn} 1s infinite alternate`,
                      animationDelay: `${index * 0.2}s`
                    }} />
                    <Typography sx={{ 
                      color: '#FFFFFF',
                      fontWeight: '500',
                      fontSize: '1.1rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      {item}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// Helper function to render feature card (add this before the export)
const renderFeatureCard = (feature, index) => (
  <Card sx={{ 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    p: 2.5,
    backgroundColor: '#2C2E43',
    color: 'white',
    transition: 'all 0.4s ease',
    animation: `${fadeIn} 1s ease-out ${index * 0.2}s both`,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: '#FBD64A',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease'
    },
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 12px 20px rgba(44, 46, 67, 0.2)',
      '& .MuiSvgIcon-root': {
        animation: `${pulse} 1s infinite`
      },
      '&::before': {
        transform: 'scaleX(1)'
      }
    },
    '& .MuiSvgIcon-root': {
      transition: 'all 0.3s ease',
      mb: 2
    },
    transform: 'none', // Remove the translateY transform
    width: '100%'
  }}>
    {feature.icon}
    <CardContent sx={{ 
      flexGrow: 1,
      p: 1.5,
      '&:last-child': { pb: 2 }
    }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: '#FBD64A',
          fontWeight: 'bold',
          mb: 1.5,
          fontSize: '1.1rem'
        }}
      >
        {feature.title}
      </Typography>
      <Typography 
        variant="body2"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: 1.5,
          fontSize: '0.9rem'
        }}
      >
        {feature.description}
      </Typography>
    </CardContent>
  </Card>
);

const features = [
  {
    icon: <CleaningServicesIcon sx={{ fontSize: 50, color: '#FBD64A' }} />,
    title: 'Professional Service',
    description: 'Expert staff using professional-grade equipment and advanced cleaning techniques'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 50, color: '#FBD64A' }} />,
    title: 'Experienced Team',
    description: 'Highly trained and vetted professionals with years of industry experience'
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 50, color: '#FBD64A' }} />,
    title: 'Quality Guaranteed',
    description: '100% satisfaction guarantee with attention to every detail'
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 50, color: '#FBD64A' }} />,
    title: '24/7 Availability',
    description: 'Round-the-clock service to meet your cleaning needs anytime'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 50, color: '#FBD64A' }} />,
    title: 'Insured & Bonded',
    description: 'Full coverage insurance for your peace of mind'
  },
  {
    icon: <RecyclingIcon sx={{ fontSize: 50, color: '#FBD64A' }} />,
    title: 'Eco-Friendly',
    description: 'Environmental-friendly cleaning solutions and sustainable practices'
  }
];

export default Home;
