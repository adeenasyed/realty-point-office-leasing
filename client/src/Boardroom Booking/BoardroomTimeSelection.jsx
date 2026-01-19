import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function BoardroomTimeSelection({label, availableTimes, selectedTime, setSelectedTime}) {

    return (    
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedTime}
                label={label}
                onChange={(event) => {setSelectedTime(event.target.value)}}
                sx={{width: '100%'}}
            >
                {availableTimes.map((time) => (
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default BoardroomTimeSelection;