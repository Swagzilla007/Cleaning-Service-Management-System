import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  const quickLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Bookings', path: '/bookings' },
    { title: 'About Us', path: '/' },
  ];

  return (
    <Box sx={{ bgcolor: '#2C2E43', color: 'white', pt: 8, pb: 4, width: '100%' }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ justifyContent: 'space-between' }}>
          {/* Contact Info - Left */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
              <Typography variant="h6" sx={{ 
                color: '#FBD64A',
                fontWeight: 600,
                fontSize: '1.3rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#FBD64A',
                  borderRadius: '2px'
                }
              }}>
                Contact Us
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#FBD64A', fontSize: '1.3rem' }} />
                <Link 
                  href="mailto:wkgayathra@gmail.com"
                  sx={{ 
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    '&:hover': { color: '#FBD64A' }
                  }}
                >
                  wkgayathra@gmail.com
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#FBD64A', fontSize: '1.3rem' }} />
                <Typography sx={{ fontSize: '1.1rem' }}>
                  Chilaw, Sri Lanka
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links - Center */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
              <Typography variant="h6" sx={{ 
                color: '#FBD64A',
                fontWeight: 600,
                fontSize: '1.3rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#FBD64A',
                  borderRadius: '2px'
                }
              }}>
                Quick Links
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {quickLinks.map((link) => (
                <Link 
                  key={link.title}
                  href={link.path}
                  sx={{ 
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    '&:hover': { color: '#FBD64A' }
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media - Right */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
              <Typography variant="h6" sx={{ 
                color: '#FBD64A',
                fontWeight: 600,
                fontSize: '1.3rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#FBD64A',
                  borderRadius: '2px'
                }
              }}>
                Follow Us
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, index) => (
                <IconButton 
                  key={index}
                  sx={{ 
                    color: 'white',
                    '&:hover': { 
                      color: '#FBD64A',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon sx={{ fontSize: '1.8rem' }} />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '1rem',
            width: '100%'
          }}
        >
          © {new Date().getFullYear()} Professional Cleaning Services. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
