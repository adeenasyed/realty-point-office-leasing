import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format, getDay, startOfMonth, getDaysInMonth } from 'date-fns';

function BoardroomCalendar({unavailableDates, handleDateSelection}) {

    const [smallScreenMarginLeft, setSmallScreenMarginLeft] = useState('auto');

    const checkWindowWidth = () => {
        if (window.innerWidth < 448) {
            const margin = Math.min(448 - window.innerWidth, 24);
            setSmallScreenMarginLeft('-' + margin + 'px');
        } else {
            setSmallScreenMarginLeft('auto'); 
        }
    };
    
    useEffect(() => {
        checkWindowWidth();
        window.addEventListener('resize', checkWindowWidth);
        return () => {
          window.removeEventListener('resize', checkWindowWidth);
        };
    }, []);

    const [spansSixWeeks, setSpansSixWeeks] = useState(false);

    const calculateSpansSixWeeks = (dateString) => {
        const date = new Date(dateString);
        const totalDaysDisplayed = getDay(startOfMonth(date)) + getDaysInMonth(date);
        return totalDaysDisplayed > 35;
    };

    useEffect(() => {
        setSpansSixWeeks(calculateSpansSixWeeks(new Date()));
    }, []);

    const shouldDisableDate = (date) => {
        const weekend = date.toDate().getDay() === 6 || date.toDate().getDay() === 0;
        const formattedDate = format(new Date(date), 'MM-dd-yyyy');
        return weekend || unavailableDates.includes(formattedDate);
    };

    return (   
        <Grid sx={{ marginLeft: smallScreenMarginLeft, marginBottom: spansSixWeeks ? '0px' : '-38px' }}> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    disablePast 
                    shouldDisableDate={shouldDisableDate}
                    views={['day']}
                    onChange={(value) => {handleDateSelection(value)}}
                    onMonthChange={(month) => {setSpansSixWeeks(calculateSpansSixWeeks(month))}}
                />
            </LocalizationProvider>
        </Grid>
    );
}

export default BoardroomCalendar;
