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
              Email: <Link href="mailto:globalopulence@yahoo.com" sx={{color: "#e7e7e7", textDecorationColor: "#e7e7e7"}}>global.opulence@yahoo.com</Link>
            </Typography>
            <Typography sx={{color: "#e7e7e7", fontSize: "16px"}}>
              Phone: <Link href="tel:+14169680288" sx={{color: "#e7e7e7", textDecorationColor: "#e7e7e7"}}>+1 (416) 968-0288</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography sx={{fontWeight: 700, color: "#e7e7e7"}}>
            Address
          </Typography>
          <Typography sx={{color: "#e7e7e7"}}>
            55 Lebovic Ave C115
          </Typography>
          <Typography sx={{color: "#e7e7e7"}}>
            Toronto, ON M1L 0H2
          </Typography>
          <Box
            sx={{marginTop: 1}}
            dangerouslySetInnerHTML={{__html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.4207978134677!2d-79.2914220245467!3d43.72258457109899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4ce759623bb27%3A0x7a774b49856b291c!2s55%20Lebovic%20Ave%2C%20Toronto%2C%20ON%20M1L%204V9!5e0!3m2!1sen!2sca!4v1710139674525!5m2!1sen!2sca" width="350" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}}
          />
          </Grid>
      </Grid>
      <Grid item xs={12} marginY={2}></Grid>
    </Box>
  );
};

export default Footer;
