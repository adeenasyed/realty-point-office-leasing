import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 16) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Header />
            <Grid item xs={12} style={{ position: "relative", width: "100%", display: "block" }}>
                <img src="/photos/Reception-min.jpg" style={{ width: "100%", height: "auto" }} />
                <Fade in={scrolled} timeout={1000}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(128, 128, 128, 0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            textAlign: "center",
                            transition: "all 1s ease",
                        }}
                    >
                        <Typography sx={{ mx: { xs: 2, sm: 4, md: 4, lg: 6 }, fontSize: { xs: "12px", sm: "15px", md: "15px", lg: "20px" }, fontWeight: 700 }}>
                            We provide a professional environment where you can focus on achieving your goals without worrying about administrative hassles. Our business centre stands out because we are committed to your success.
                        </Typography>
                    </Box>
                </Fade>
            </Grid>

            <Box sx={{ backgroundColor: "#003366", padding: 6 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6} alignContent="center">
                        <Typography variant="body1" style={{ color: "white" }}>
                            Global Opulence Business Centre offers fully furnished office spaces for both short-term and long-term use. The work spaces we offer, including private rooms and desks, are available at very competitive rates to all professionals and business owners. Our business centre is located in One Centre Plaza on Lebovic Ave, south of Eglinton Ave E, in the city of Scarborough. 
                        </Typography>
                        <div style={{paddingTop: "16px"}}>
                            <Link to="/units" style={{ textDecoration: 'none'}}>
                                <Typography variant="button" sx={{ color: "white", fontWeight: 700, cursor: "pointer" }}>View Units <ArrowRightAltIcon/></Typography>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src="/photos/Boardroom/DSC00372.jpg" style={{ width: "100%", height: "auto" }} alt="Office" />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ backgroundColor: "#800000", padding: 6 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <img src="/photos/Amenities/0S7A7400.jpg" style={{ width: "100%", height: "auto" }} alt="Office" />
                    </Grid>
                    <Grid item xs={12} md={6} alignContent="center" textAlign="right">
                        <Typography variant="body1" style={{ color: "white" }}>
                            Our business centre is conveniently located within walking distance of the Eglinton Crosstown LRT and within driving distance of Hwy 401 and the DVP. Surrounding are a variety of commercial, entertainment, and fitness centers, financial and legal institutions, and food/drink spots. Parking and Internet are just the beginning of the list of amenities we provide to support you.
                        </Typography>
                        <div style={{paddingTop: "16px"}}>
                            <Link to="/amenities" style={{ textDecoration: 'none'}}>
                                <Typography variant="button" sx={{ color: "white", fontWeight: 700, cursor: "pointer" }}>View All Amenities <ArrowRightAltIcon/></Typography>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <Footer />
        </>
    );
}

export default Home;
