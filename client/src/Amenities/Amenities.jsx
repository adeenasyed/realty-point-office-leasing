import Header from "../Header/Header";
import Footer from  "../Footer/Footer";
import AmenitiesGrid from "./AmenitiesGrid";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LocationOn from '@mui/icons-material/LocationOn';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PrintIcon from '@mui/icons-material/Print';
import FaxIcon from '@mui/icons-material/Fax';
import PhoneIcon from '@mui/icons-material/Phone';
import ComputerIcon from '@mui/icons-material/Computer';
import MailIcon from '@mui/icons-material/Mail';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const amenities = [
    { icon: <LocalParkingIcon fontSize="large"/>, text: 'Parking for clients and visitors' },
    { icon: <WifiIcon fontSize="large"/>, text: 'Reliable, high-speed business fibre Internet' },
    { icon: <EmojiPeopleIcon fontSize="large"/>, text: 'Full-service front desk with client and visitor processing' },
    { icon: <CleaningServicesIcon fontSize="large"/>, text: 'Professionally cleaned and maintained space' },
    { icon: <LocationOn fontSize="large"/>, text: 'Nearby food/drink, fitness, entertainment, shopping, banking, and legal options. 9 min drive from Hwy 401 and DVP. 8 min walk from Eglinton Crosstown LRT'},
    { icon: <LocalCafeIcon fontSize="large"/>, text: 'Kitchen stocked with water, tea, and coffee' },
    { icon: <VideocamIcon fontSize="large"/>, text: '24/7 video surveillance' },
    { icon: <VolumeOffIcon fontSize="large"/>, text: 'Noise, vibration, and scent free environment' },
];

const services = [
    { icon: <PrintIcon fontSize="large"/>, text: 'Printing - 10¢ / B&W page, 30¢ / colored page' },
    { icon: <FaxIcon fontSize="large"/>, text: 'Faxing - $5 for first page + $2 for additional pages (max $25), free processing for incoming faxes' },
    { icon: <PhoneIcon fontSize="large"/>, text: 'Phone - $10 / month' },
    { icon: <ComputerIcon fontSize="large"/>, text: 'Computer - $50 / month' },
    { icon: <MailIcon fontSize="large"/>, text: 'Mailbox - $25 / month' },
];

const images = ["0S7A6370", "0S7A6369", "0S7A6365", "0S7A6366", "DSC00679", "DSC00682", "DSC00769", "0S7A7400", "0S7A7398", "0S7A7397", "0S7A7392", "0S7A7390", "0S7A7389", "0S7A7385", "0S7A7384", "0S7A7383"];

function Amenities() { 
    return (
        <>
            <Header/>
                <Grid container paddingX={2}>
                    <Grid container paddingY={6}>
                        <Grid item xs={12} paddingBottom={6} align="center">
                            <Typography sx={{fontWeight: 700, fontSize: '35px'}}>Amenities</Typography>
                        </Grid>
                        <AmenitiesGrid items={amenities}/>
                    </Grid>
                    <Grid container paddingBottom={6}>
                        <Grid item xs={12} paddingBottom={6} align="center" >
                            <Typography sx={{fontWeight: 700, fontSize: '35px'}}>Pay-Per-Use Services</Typography>
                        </Grid>
                        <AmenitiesGrid items={services}/>
                    </Grid>
                    <Grid container spacing={2} paddingBottom={6} justifyContent="center">
                        {images.map((img, index) => (
                            <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
                                <Card elevation={0} sx={{borderRadius: 0}}>
                                    <CardMedia
                                        component="img"
                                        sx={{ objectFit: 'cover' }}
                                        image={`/photos/Amenities/${img}.jpg`}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            <Footer/>
        </>
    )
}

export default Amenities;