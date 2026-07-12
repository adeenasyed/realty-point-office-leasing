import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import DailyCalendar from './DailyCalendar';
import MonthlyCalendar from './MonthlyCalendar';
import Agreement from '../Agreement';
import Footer from "../Footer/Footer";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function UnitBooking() {

    let { unitID } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState([]);
    const [images, setImages] = useState([]);
    const [bookedDates, setBookedDates] = useState([]);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [showAgreement, setShowAgreement] = useState(false);
    const [rentOption, setRentOption] = useState("");

    const fetchUnitInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/units.json`);
            const units = await response.json();
            const unit = units.find(u => u._id === unitID);
            setUnit(unit);
            setImages(unit.images);
            setBookedDates([]);
            setUnavailableDates([]);
            setLoading(false);
        } catch (error) {/* */}
    };

    useEffect(() => {
        fetchUnitInfo();
    }, []);

    const handleRentOption = (event) => { 
        setSelectedDates([]);
        setSelectedMonths([]);
        setRentOption(event.target.value);
    };

    const createBooking = () => {
        navigate('/paymentSuccess');
    };

    return (
        <>
            <Header/>
            <Grid container padding={4}>
                <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2}>
                    <Typography sx={{ fontWeight: 700, fontSize: '30px' }}>{unit.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} paddingRight={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
                    <Carousel>
                        {images.map((img, index) => (
                            <Carousel.Item key={index}>
                                <img src={`/photos/${unit.type === "work desk" ? "Work Desk" : unit.name}/${img}.jpg`} style={{ width: '100%', height: 'auto' }} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Typography sx={{ paddingTop: 1 }}>Daily Rate: ${unit.daily_rent}.00</Typography>
                    <Typography sx={{ paddingBottom: 1 }}>Monthly Rate: ${unit.monthly_rent}.00</Typography>
                    <Typography sx={{ paddingY: 1 }}>{unit.description}</Typography>
                    <Grid sx={{ paddingY: 1 }}>
                        <Link to="/amenities" style={{ textDecoration: 'none' }}>
                            <Typography variant="button" sx={{ color: "#1976D2", fontWeight: 700, cursor: "pointer" }}>View Amenities</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} paddingTop={{ xs: 3, sm: 3, md: 0, lg: 0 }} paddingLeft={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
                    <Paper component={Grid} container sx={{ padding: 4 }}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 700 }}>Select option</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <RadioGroup onChange={(event) => {handleRentOption(event)}}>
                                    <FormControlLabel value="daily" control={<Radio checkedIcon={<CheckCircleIcon/>} />}  label={<span style={{fontSize: 15}}>Rent daily (for 1 or more days)</span>} />
                                    <FormControlLabel value="monthly" control={<Radio checkedIcon={<CheckCircleIcon/>} />} label={<span style={{fontSize: 15}}>Rent monthly (for 1 or more months)</span>} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {rentOption === "daily" &&
                            <Grid container marginTop={2}>
                                <Grid item xs={12} container alignItems="center" justifyContent="space-between">
                                    <Typography sx={{ fontWeight: 700 }}>Select date(s)</Typography>
                                    <Button size="small" sx={{ color: 'grey' }} onClick={() => setSelectedDates([])}>
                                        Clear
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <DailyCalendar unavailableDates={[...bookedDates, ...unavailableDates]} selectedDates={selectedDates} setSelectedDates={setSelectedDates} calendarKey={rentOption}/>
                                </Grid>
                            </Grid>
                        }
                        {rentOption === "monthly" &&
                            <Grid container marginTop={2}>
                                <Grid item xs={12} container alignItems="center" justifyContent="space-between">
                                    <Typography sx={{ fontWeight: 700 }}>Select month(s)</Typography>
                                    <Button size="small" sx={{ color: 'grey' }} onClick={() => setSelectedMonths([])}>
                                        Clear
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <MonthlyCalendar unavailableDates={bookedDates} selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths}/>
                                </Grid>
                            </Grid>
                        }
                        {selectedDates.length > 0 &&
                            <Grid container marginTop={3}>
                                <Grid item xs={12} align="right">
                                    <Typography >${unit.daily_rent}.00 x {selectedDates.length} day(s)</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>HST</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography>${parseFloat(unit.daily_rent*selectedDates.length*0.13).toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Processing Fee</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography>${parseFloat(unit.daily_rent * selectedDates.length * 1.13 * 0.03).toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12} paddingY={0.5}>
                                    <Box borderTop={1} borderColor="#9e9e9e"></Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography sx={{ fontWeight: 700 }}>${parseFloat(unit.daily_rent*selectedDates.length*1.03*1.13).toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        }
                        {selectedMonths.length > 0 &&
                            <>
                                <Grid container marginTop={3}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontWeight: 700, textDecoration: "underline" }}>
                                            Due Now
                                            {selectedMonths.length > 2 && 
                                                <Tooltip enterTouchDelay={0} leaveTouchDelay={3000} title={`For first and last months`}>
                                                    <InfoOutlinedIcon sx={{ fontSize: "15px", marginLeft: "4px", marginBottom: "2px"}}/>
                                                </Tooltip>
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Rent</Typography>
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        <Typography>${parseFloat(Math.min(unit.monthly_rent * selectedMonths.length, unit.monthly_rent * 2)).toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>HST</Typography>
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        <Typography>${parseFloat(Math.min(unit.monthly_rent * selectedMonths.length, unit.monthly_rent * 2) * 0.13).toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Processing Fee</Typography>
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        <Typography>${parseFloat(Math.min(unit.monthly_rent * selectedMonths.length, unit.monthly_rent * 2) * 1.13 * 0.03).toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} paddingY={0.5}>
                                        <Box borderTop={1} borderColor="#9e9e9e"></Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                                    </Grid>
                                    <Grid item xs={6} align="right">
                                        <Typography sx={{ fontWeight: 700 }}>${parseFloat(Math.min(unit.monthly_rent * selectedMonths.length, unit.monthly_rent * 2) * 1.03 * 1.13).toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                                {selectedMonths.length > 2 &&
                                    <Grid container marginTop={3}>
                                        <Grid item xs={12}>
                                            <Typography sx={{ fontWeight: 700, textDecoration: "underline" }}>
                                                Due Monthly
                                                <Tooltip enterTouchDelay={0} leaveTouchDelay={3000} title={`For remaining ${selectedMonths.length - 2} month(s)`}>
                                                    <InfoOutlinedIcon sx={{ fontSize: "15px", marginLeft: "4px", marginBottom: "2px"}}/>
                                                </Tooltip>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>Rent</Typography>
                                        </Grid>
                                        <Grid item xs={6} align="right">
                                            <Typography>${parseFloat(unit.monthly_rent).toFixed(2)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>HST</Typography>
                                        </Grid>
                                        <Grid item xs={6} align="right">
                                            <Typography>${parseFloat(unit.monthly_rent * 0.13).toFixed(2)}</Typography>
                                        </Grid>
                                        <Grid item xs={12} paddingY={0.5}>
                                            <Box borderTop={1} borderColor="#9e9e9e"></Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                                        </Grid>
                                        <Grid item xs={6} align="right">
                                            <Typography sx={{ fontWeight: 700 }}>${parseFloat(unit.monthly_rent * 1.13).toFixed(2)}</Typography>
                                        </Grid>
                                    </Grid>
                                }
                            </>
                        }
                        {(selectedDates.length > 0 || selectedMonths.length > 0) && 
                            <Grid item xs={12} marginTop={3.5}>
                                <Button variant="contained" disableElevation sx={{ width: '100%' }} onClick={() => {setShowAgreement(true)}}>Proceed to Payment</Button>
                            </Grid>
                        }
                    </Paper>
                </Grid>
            </Grid>
            <Footer/>
            <Agreement showAgreement={showAgreement} setShowAgreement={setShowAgreement} createBooking={createBooking} unit={unit.name} rentOption={rentOption}/>
        
        </>
    );
}

export default UnitBooking;
