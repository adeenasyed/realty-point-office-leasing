import { useState, forwardRef } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import DailyCalendar from "../Unit Booking/DailyCalendar";

const units = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6", "Room 7", "Desk 1", "Desk 2", "Desk 3", "Desk 4", "Desk 5", "Boardroom"];

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManageAvailability() {

    const [unitSelectionOpen, setUnitSelectionOpen] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const setUnavailability = async () => {
        try {
            await axios.post(`/api/setUnavailability`, { selectedUnits, selectedDates });
            setSelectedUnits([]);
            setSelectedDates([]);
            setShowAlert(true);
        } catch (error) {/* */}
    };

    return (
        <>
            <Paper align="center" sx={{ boxShadow: "none", width: "345px", padding: 2 }}>
                <Grid item xs={12} paddingY={2}> 
                    <Typography>Select units to manage availability for:</Typography>
                    <Autocomplete
                        open={unitSelectionOpen}
                        onOpen={() => setUnitSelectionOpen(true)}
                        onClose={() => setUnitSelectionOpen(false)}
                        multiple
                        options={units}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                inputProps={{ ...params.inputProps, readOnly: true }} 
                                variant="standard"
                                label=""
                                placeholder=""
                            />
                        )}
                        clearIcon={null}
                        style={{ width: '300px' }}
                        size="small"
                        onChange={(event, unit) => { setSelectedUnits(unit) }}
                        value={selectedUnits}
                        disableCloseOnSelect
                    />
                </Grid>
                <Grid item xs={12} paddingTop={2}> 
                    <Typography>Select dates to make unavailable:</Typography>
                    <DailyCalendar unavailableDates={[]} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained"
                        disableElevation
                        sx={{ width: "315px" }} 
                        disabled={selectedUnits.length === 0 || selectedDates.length === 0} 
                        onClick={() => setUnavailability()}
                        
                    >
                        Sumbit
                    </Button>
                </Grid>
            </Paper>
            <Snackbar open={showAlert} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setShowAlert(false)} severity={"success"}>
                    Updated availability
                </Alert>
            </Snackbar>
        </>

    )
}

export default ManageAvailability;