import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import Divider from '@mui/material/Divider';
import { styled } from "@mui/material";
import { format } from 'date-fns';
import SearchComponent from "./SearchComponent";
import SortFilterComponent from "./SortFilterComponent";

const unitFilterOptions = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6", "Room 7", "Desk 1", "Desk 2", "Desk 3", "Desk 4", "Desk 5"];
const dateSortOptions = ["Ascending", "Descending"];
const dateFilterOptions = ["All", "Past", "Future"];
const rowsPerPage = 5;

function ViewReservations({bookings, boardroomBookings}) {

    const [bookingsTable, setBookingsTable] = useState([]);
    const [bookingsIds, setBookingsIds] = useState([]);
    const [bookingsNames, setBookingsNames] = useState([]);

    const [boardroomBookingsTable, setBoardroomBookingsTable] = useState([]);
    const [boardroomBookingsIds, setBoardroomBookingsIds] = useState([]);
    const [boardroomBookingsNames, setBoardroomBookingsNames] = useState([]);

    useEffect(() => {
        setBookingsTable(bookings);
        setBookingsIds(bookings.map(booking => booking._id));
        setBookingsNames(bookings.map(booking => booking.name));
    }, [bookings]);

    useEffect(() => {
        setBoardroomBookingsTable(boardroomBookings);
        setBoardroomBookingsIds(boardroomBookings.map(booking => booking._id));
        setBoardroomBookingsNames(boardroomBookings.map(booking => booking.name));
    }, [boardroomBookings]);

    const [bookingIdFilter, setBookingIdFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [unitFilterOpen, setUnitFilterOpen] = useState(false);
    const [dateSortOpen, setDateSortOpen] = useState(false);
    const [dateFilterOpen, setDateFilterOpen] = useState(false);
    const [unitFilter, setUnitFilter] = useState([]);
    const [dateSort, setDateSort] = useState("Ascending");
    const [dateFilter, setDateFilter] = useState("All");

    const sortFilterBookings = () => { 
        let sortedFilteredBookings = bookings.filter((booking) => {
            if (bookingIdFilter && !booking._id.includes(bookingIdFilter)) { 
                return false;
            }
            if (nameFilter && !booking.name.toLowerCase().includes(nameFilter.toLowerCase())) { 
                return false;
            }
            if (unitFilter.length > 0 && !unitFilter.includes(booking.unit.name)) {
                return false;
            }
            let lastDate;    
            if (booking.dates) {
                lastDate = new Date(booking.dates[booking.dates.length - 1]);
            } else {
                const [month, year] = booking.months[booking.months.length - 1].split("-");
                lastDate = new Date(year, month, 0);
            }
            if (dateFilter === "Past") {
                if (new Date(lastDate) > new Date()) {
                    return false;
                }
            } else if (dateFilter === "Future") {
                if (new Date(lastDate) < new Date()) {
                    return false;
                }
            }
            return true;
        }).sort((a, b) => {
            if (dateSort === "Ascending") {
                return a.firstDate - b.firstDate || a.lastDate - b.lastDate;
            } else {
                return b.firstDate - a.firstDate || b.lastDate - a.lastDate;
            }
        });
        setBookingsTable(sortedFilteredBookings);
    }

    useEffect(() => {
        sortFilterBookings();
        setBookingsPage(1);
    }, [bookingIdFilter, nameFilter, unitFilter, dateSort, dateFilter]);

    const [boardroomBookingIdFilter, setBoardroomBookingIdFilter] = useState("");
    const [boardroomNameFilter, setBoardroomNameFilter] = useState("");
    const [boardroomDateSortOpen, setBoardroomDateSortOpen] = useState(false);
    const [boardroomDateFilterOpen, setBoardroomDateFilterOpen] = useState(false);
    const [boardroomDateSort, setBoardroomDateSort] = useState("Ascending");
    const [boardroomDateFilter, setBoardroomDateFilter] = useState("All");

    const sortFilterBoardroomBookings = () => { 
        let sortedFilteredBoardroomBookings = boardroomBookings.filter((booking) => {
            if (boardroomBookingIdFilter && !booking._id.includes(boardroomBookingIdFilter)) { 
                return false;
            }
            if (boardroomNameFilter && !booking.name.toLowerCase().includes(boardroomNameFilter.toLowerCase())) { 
                return false;
            }
            if (boardroomDateFilter === "Past") {
                if (booking.endISO > new Date()) {
                    return false;
                }
            } else if (boardroomDateFilter === "Future") {
                if (booking.endISO < new Date()) {
                    return false;
                }
            }
            return true;
        }).sort((a, b) => {
            if (boardroomDateSort === "Ascending") {
                return a.startISO - b.startISO;
            } else {
                return b.startISO - a.startISO;
            }
        });
        setBoardroomBookingsTable(sortedFilteredBoardroomBookings);
    }

    useEffect(() => {
        sortFilterBoardroomBookings();
        setBoardroomBookingsPage(1);
    }, [boardroomBookingIdFilter, boardroomNameFilter, boardroomDateSort, boardroomDateFilter]);

    const [bookingsPage, setBookingsPage] = useState(1);
    const bookingsTableSliced = bookingsTable.slice((bookingsPage - 1) * rowsPerPage, bookingsPage * rowsPerPage);
    const [boardroomBookingsPage, setBoardroomBookingsPage] = useState(1);
    const boardroomBookingsTableSliced = boardroomBookingsTable.slice((boardroomBookingsPage - 1) * rowsPerPage, boardroomBookingsPage * rowsPerPage);

    const TableHeader = styled(TableCell)({ fontWeight: 700 });

    return (
        <Grid container sx={{padding: 2}}>
            <Grid item xs={12} paddingTop={2} paddingBottom={4}>
                <Typography sx={{fontWeight: 700, fontSize: '20px'}}>Private Room & Work Desk Reservations</Typography>
            </Grid>
            <Grid item xs={2.4}>
                <SearchComponent inputValue={bookingIdFilter} setInputValue={setBookingIdFilter} allOptions={bookingsIds} label={"ID"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SearchComponent inputValue={nameFilter} setInputValue={setNameFilter} allOptions={bookingsNames} label={"Name"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SortFilterComponent open={unitFilterOpen} setOpen={setUnitFilterOpen} options={unitFilterOptions} defaultValue={undefined} value={unitFilter} setValue={setUnitFilter} label={"Unit Filter Options"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SortFilterComponent open={dateSortOpen} setOpen={setDateSortOpen} options={dateSortOptions} defaultValue={"Ascending"} value={dateSort} setValue={setDateSort} label={"Date Sort Options"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SortFilterComponent open={dateFilterOpen} setOpen={setDateFilterOpen} options={dateFilterOptions} defaultValue={"All"} value={dateFilter} setValue={setDateFilter} label={"Date Filter Options"}/>
            </Grid>
            <Grid item xs={12} paddingY={2}> 
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ border: '1px solid #dddddd' }}>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Booking ID</TableHeader>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Unit</TableHeader>
                                <TableHeader>Months/Dates</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingsTableSliced.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking._id}</TableCell>
                                    <TableCell>{booking.name}</TableCell>
                                    <TableCell>{booking.email}</TableCell>
                                    <TableCell>{booking.unit.name}</TableCell>
                                    <TableCell>  
                                        {booking.type === "DailyBooking" && booking.dates.map((date, index) => (<div key={index}>{format(new Date(date), 'MM-dd-yyyy')}</div>))}
                                        {booking.type === "MonthlyBooking" && booking.months.map((month, index) => (<div key={index}>{month}</div>))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container justifyContent="center">
                <Pagination 
                    count={Math.ceil(bookingsTable.length / rowsPerPage)} 
                    page={bookingsPage} 
                    onChange={(event, value) => {setBookingsPage(value)}} 
                    color="primary"
                />
            </Grid>
            <Grid><Divider sx={{ marginY: 4 }}/></Grid>
            <Grid item xs={12} paddingTop={2} paddingBottom={4}>
                <Typography sx={{fontWeight: 700, fontSize: '20px'}}>Boardroom Reservations</Typography>
            </Grid>
            <Grid item xs={2.4}>
                <SearchComponent inputValue={boardroomBookingIdFilter} setInputValue={setBoardroomBookingIdFilter} allOptions={boardroomBookingsIds} label={"ID"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SearchComponent inputValue={boardroomNameFilter} setInputValue={setBoardroomNameFilter} allOptions={boardroomBookingsNames} label={"Name"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SortFilterComponent open={boardroomDateSortOpen} setOpen={setBoardroomDateSortOpen} options={dateSortOptions} defaultValue={"Ascending"} value={boardroomDateSort} setValue={setBoardroomDateSort} label={"Date Sort Options"}/>
            </Grid>
            <Grid item xs={2.4}>
                <SortFilterComponent open={boardroomDateFilterOpen} setOpen={setBoardroomDateFilterOpen} options={dateFilterOptions} defaultValue={"All"} value={boardroomDateFilter} setValue={setBoardroomDateFilter} label={"Date Filter Options"}/>
            </Grid>
            <Grid item xs={12} paddingY={2}> 
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ border: '1px solid #dddddd' }}>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Booking ID</TableHeader>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Time</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {boardroomBookingsTableSliced.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking._id}</TableCell>
                                    <TableCell>{booking.name}</TableCell>
                                    <TableCell>{booking.email}</TableCell>
                                    <TableCell>{format(new Date(booking.date), 'MM-dd-yyyy')}</TableCell>
                                    <TableCell>{booking.startTime} - {booking.endTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container justifyContent="center">
                <Pagination 
                    count={Math.ceil(boardroomBookingsTable.length / rowsPerPage)} 
                    page={boardroomBookingsPage} 
                    onChange={(event, value) => {setBoardroomBookingsPage(value)}} 
                    color="primary"
                />
            </Grid>
        </Grid>
    );
}

export default ViewReservations;