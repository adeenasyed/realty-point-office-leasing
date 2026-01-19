import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import BoardroomCalendar from './BoardroomCalendar';
import BoardroomTimeSelection from './BoardroomTimeSelection';
import Agreement from '../Agreement';
import Footer from '../Footer/Footer'
import { format } from 'date-fns';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BoardroomBooking() {

    let { boardroomID } = useParams();
    const [loading, setLoading] = useState(true);
    const [boardroom, setBoardroom] = useState([]);
    const [images, setImages] = useState([]);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [availableStartTimes, setAvailableStartTimes] = useState([]);
    const [availableEndTimes, setAvailableEndTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showAgreement, setShowAgreement] = useState(false);

    const handleDateSelection = (date) => {
        setStartTime('');
        setEndTime('');
        const formattedDate = format(new Date(date), 'MM-dd-yyyy');
        setSelectedDate(formattedDate);
    };
    
    const handleStartTimeSelection = (time) => {
        setEndTime('');
        setStartTime(time);
    };

    const fetchBoardroomInfo = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/fetchBoardroomInfo/${boardroomID}`);
            setBoardroom(response.data.boardroom);
            setImages(response.data.boardroom.images);
            setUnavailableDates(response.data.unavailableDates);
            setLoading(false);
        } catch (error) {/**/}
    };

    useEffect(() => {
        fetchBoardroomInfo();
    }, []);

    const fetchBoardroomStartTimes = async (selectedDate) => {
        try {
            const response = await axios.get(`/api/fetchBoardroomStartTimes?date=${selectedDate}`);
            setAvailableStartTimes(response.data.availableStartTimes);
        } catch (error) {/**/}
    };
      
    useEffect(() => {
        if (selectedDate) { 
            fetchBoardroomStartTimes(selectedDate);
        }
    }, [selectedDate]);

    const fetchBoardroomEndTimes = async (selectedDate, startTime) => {
        try {
            const response = await axios.get(`/api/fetchBoardroomEndTimes?date=${selectedDate}&startTime=${startTime}`);
            setAvailableEndTimes(response.data.availableEndTimes);
        } catch (error) {/**/}
    };

    useEffect(() => {
        if (startTime) { 
            fetchBoardroomEndTimes(selectedDate, startTime);
        }
    }, [startTime, selectedDate]);

    const [numHours, setNumHours] = useState();
    useEffect(() => {
        if (endTime) { 
            const formatTime = (timeToFormat) => {
                const [time, meridiem] = timeToFormat.split(' ');
                let [hours, minutes] = time.split(':');
                hours = parseInt(hours);
                if (hours !== 12 && meridiem === 'PM') hours += 12;
                if (hours === 12 && meridiem === 'AM') hours = 0;
                return hours + minutes / 60
            };
            setNumHours(formatTime(endTime) - formatTime(startTime));
        }
    }, [endTime, startTime]);

    const createBooking = async () => {
        try {
            const response = await axios.post(`/api/bookBoardroom`, {selectedDate, startTime, endTime});
            const checkoutSession = response.data.checkoutSession;
            if (checkoutSession) {
                window.location.href = checkoutSession;
            }
        } catch (error) {/* */}
    };
    
    return (
        <>
            <Header/>
            <Grid container padding={4}>
                <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2}>
                    <Typography sx={{ fontWeight: 700, fontSize: '30px' }}>{boardroom.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} paddingRight={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
                <Carousel>
                    {images.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img src={`/photos/Boardroom/${img}.jpg`} style={{ width: '100%', height: 'auto' }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                    <Typography sx={{ paddingTop: 1 }}>Hourly Rate: ${boardroom.hourly_rent}.00</Typography>
                    <Typography sx={{ paddingBottom: 1 }}>Max Rate: ${boardroom.max_rent}.00</Typography>
                    <Typography sx={{ paddingY: 1 }}>{boardroom.description}</Typography>
                    <Grid sx={{ paddingY: 1 }}>
                        <Link to="/amenities" style={{ textDecoration: 'none' }}>
                            <Typography variant="button" sx={{ color: "#1976D2", fontWeight: 700, cursor: "pointer" }}>View Amenities</Typography>
                        </Link>
                    </Grid>             
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} paddingTop={{ xs: 3, sm: 3, md: 0, lg: 0 }} paddingLeft={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
                    <Paper component={Grid} container sx={{ padding: 4 }} >
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: 700 }}>Select date</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <BoardroomCalendar unavailableDates={unavailableDates} handleDateSelection={handleDateSelection}/>
                        </Grid>
                        {selectedDate && 
                            <>
                                <Grid item xs={12} marginTop={1.5} marginBottom={3}>
                                    <Typography sx={{ fontWeight: 700 }}>Select time</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <BoardroomTimeSelection label={"Start"} availableTimes={availableStartTimes} selectedTime={startTime} setSelectedTime={handleStartTimeSelection}/>
                                </Grid>
                            </>
                        }
                        {(selectedDate && startTime) &&
                            <>
                                <Grid item xs={2} align="center" alignSelf="center">
                                    <Typography sx={{ fontSize: 20 }}>-</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <BoardroomTimeSelection label={"End"} availableTimes={availableEndTimes} selectedTime={endTime} setSelectedTime={setEndTime}/>
                                </Grid>
                            </>
                        }
                        {(selectedDate && startTime && endTime) && 
                            <>
                                <Grid item xs={12} marginTop={3.5} align="right">
                                    {(numHours <= 5) ? <Typography>$100.00 x {numHours} hour(s)</Typography> : <Typography>$500.00</Typography>}
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>HST</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography>${parseFloat((Math.min(numHours*100, 500) * 0.13).toFixed(2))}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Processing Fee</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography>${parseFloat(Math.min(numHours*100, 500) * 1.13 * 0.03).toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12} paddingY={0.5}>
                                    <Box borderTop={1} borderColor="#9e9e9e"></Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                                </Grid>
                                <Grid item xs={6} align="right">
                                    <Typography sx={{ fontWeight: 700 }}>${parseFloat(Math.min(numHours*100, 500) * 1.03 * 1.13).toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12} marginTop={3.5}>
                                    <Button variant="contained" disableElevation sx={{ width: '100%' }} onClick={() => {setShowAgreement(true)}}>Reserve</Button>
                                </Grid>
                            </>
                        }
                    </Paper>
                </Grid>
            </Grid> 
            <Footer/>
            <Agreement showAgreement={showAgreement} setShowAgreement={setShowAgreement} createBooking={createBooking} unit={"the Boardroom"}/>
        </>
    );
}

export default BoardroomBooking;
