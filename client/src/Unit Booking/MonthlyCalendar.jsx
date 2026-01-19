import { useState, useMemo } from 'react';
import Grid from '@mui/material/Grid'; 
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const MonthlyCalendar = ({ unavailableDates, selectedMonths, setSelectedMonths }) => {

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const disabledMonths = useMemo(() => {
    const disableSet = new Set();
    unavailableDates.forEach(dateStr => {
      const date = new Date(dateStr);
      const month = date.getMonth();
      const year = date.getFullYear();
      if (year === selectedYear) {
        disableSet.add(month);
      }
    });
    if (selectedYear === currentYear) {
      const currentMonth = new Date().getMonth();
      for (let i = 0; i <= currentMonth; i++) {
        disableSet.add(i);
      }
    }
    return disableSet;
  }, [unavailableDates, currentYear, selectedYear]);

  const handleMonthSelection = (monthIndex) => {
    const formattedMonth = `${monthIndex + 1}-${selectedYear}`;
    if (selectedMonths.includes(formattedMonth)) {
      setSelectedMonths(selectedMonths.filter(month => month !== formattedMonth));
    } else {
      setSelectedMonths([...selectedMonths, formattedMonth]);
    }
  };

  const handleYearSelection = (value) => {
    setSelectedYear(year => year + value);
  };
  
  return (
    <Grid container>
      <Grid item xs={12} paddingY={1} display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={() => handleYearSelection(-1)} disabled={selectedYear <= currentYear}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography sx={{ paddingX: 2 }}>
          {selectedYear}
        </Typography>
        <IconButton onClick={() => handleYearSelection(1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        {months.map((month, index) => (
          <Grid item xs={6} key={index}>
            <ToggleButton
              fullWidth
              sx={{
                borderRadius: '5px', 
                backgroundColor: selectedMonths.includes(`${(index + 1)}-${selectedYear}`) && '#1976D2',  
                color: selectedMonths.includes(`${(index + 1)}-${selectedYear}`) && 'white', 
                '&:hover': selectedMonths.includes(`${(index + 1)}-${selectedYear}`) && {backgroundColor: '#1976D2', color: 'white'}
              }}
              disabled={disabledMonths.has(index)}
              onClick={() => handleMonthSelection(index)}
            >
              {month}
            </ToggleButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MonthlyCalendar;
