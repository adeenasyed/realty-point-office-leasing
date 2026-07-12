import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

const Footer = () => {

  const location = useLocation();
  const isHomePage = location.pathname === '/'

  return (
    <Box component="footer" sx={{marginTop: isHomePage ? 0: 6, padding: 2, backgroundColor: "#231F20"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Grid>
            <Typography sx={{fontWeight: 700, color: "#e7e7e7"}}>
              Hours
            </Typography>
            <Typography sx={{color: "#e7e7e7"}}>
              Monday - Friday: 9:00 AM - 6:00 PM
            </Typography>
          </Grid>
          <Grid marginTop={3}>
            <Typography sx={{fontWeight: 700, color: "#e7e7e7"}}>
              Contact
            </Typography>
            <Typography sx={{color: "#e7e7e7"}}>
              Email: <Link href="mailto:abc@example.com" sx={{color: "#e7e7e7", textDecorationColor: "#e7e7e7"}}>abc@example.com</Link>
            </Typography>
            <Typography sx={{color: "#e7e7e7", fontSize: "16px"}}>
              Phone: <Link href="tel:+11234567890" sx={{color: "#e7e7e7", textDecorationColor: "#e7e7e7"}}>+1 (123) 456-7890</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography sx={{fontWeight: 700, color: "#e7e7e7"}}>
            Address
          </Typography>
          <Typography sx={{color: "#e7e7e7"}}>
            123 Maple Street
          </Typography>
          <Typography sx={{color: "#e7e7e7"}}>
            Toronto, ON M5V 2T6
          </Typography>
          <Box
            sx={{marginTop: 1}}
            dangerouslySetInnerHTML={{__html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.756905281203!2d-79.3831843!3d43.6532258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34cc627a19bf%3A0x6e4a2923a91a34a2!2s123%20Maple%20Street%2C%20Toronto%2C%20ON%20K0G%200A0!5e0!3m2!1sen!2sca!4v1783836378948!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}}
          />
          </Grid>
      </Grid>
      <Grid item xs={12} marginY={2}></Grid>
    </Box>
  );
};

export default Footer;
