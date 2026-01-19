import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from 'axios';
import ViewReservations from "./ViewReservations";
import ManageAvailability from "./ManageAvailability";

function Admin() {

    const [bookings, setBookings] = useState([]);
    const [boardroomBookings, setBoardroomBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/fetchBookings`, { withCredentials: true });
            const data = response.data;
            const sortedBookings = data.bookings.map(booking => {
                if (booking.type === 'DailyBooking') {
                    booking.firstDate = new Date(booking.dates[0]);
                    booking.lastDate = new Date(booking.dates[booking.dates.length-1]);
                } else if (booking.type === 'MonthlyBooking') {
                    const [firstMonth, firstYear] = booking.months[0].split('-');
                    booking.firstDate = new Date(firstYear, firstMonth, 0);
                    const [lastMonth, lastYear] = booking.months[booking.months.length-1].split('-');
                    booking.lastDate = new Date(lastYear, lastMonth, 0);
                }
                return booking;
            }).sort((a, b) => a.firstDate - b.firstDate);
            setBookings(sortedBookings);

            const sortedBoardroomBookings = data.boardroomBookings.map(booking => {
                const formatDateTime = (dateStr, timeStr) => {
                    const [month, day, year] = dateStr.split('-');
                    const [time, meridiem] = timeStr.split(' ');
                    let [hours, minutes] = time.split(':');
                    hours = parseInt(hours);
                    if (hours !== 12 && meridiem === 'PM') hours += 12;
                    if (hours === 12 && meridiem === 'AM') hours = 0;
                    hours = hours.toString().padStart(2, '0');
                    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00Z`);
                };
                booking.startISO = formatDateTime(booking.date, booking.startTime);
                booking.endISO = formatDateTime(booking.date, booking.endTime);
                return booking;
            }).sort((a, b) => a.startISO - b.startISO);
            setBoardroomBookings(sortedBoardroomBookings);
        } catch (error) {/* */}
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
 
    const tabs = [
        { label: "View Reservations", value: 1, component: <ViewReservations bookings={bookings} boardroomBookings={boardroomBookings}/> },
        { label: "Manage Availability", value: 2, component: <ManageAvailability /> }
    ];

    const renderTab = () => {
        const selectedTab = tabs.find(tab => tab.value === value);
        return selectedTab && selectedTab.component;
    }

    return ( 
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="scrollable" value={value} onChange={handleChange}>
                    {tabs.map(tab => (<Tab key={tab.value} label={tab.label} value={tab.value} />))}
                </Tabs>
            </Box>
            {renderTab()}
        </>
    );
}

export default Admin;