import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function SortFilterComponent({open, setOpen, options, defaultValue, value, setValue, label}) {

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            multiple={!defaultValue}
            limitTags={1}
            options={options}
            defaultValue={defaultValue}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: defaultValue }} 
                    variant="standard"
                    label={label}
                    placeholder=""
                />
            )}
            clearIcon={null}
            style={{ width: '225px' }}
            size="small"
            onChange={(event, option) => { setValue(option) }}
            value={value}
            disableCloseOnSelect={!defaultValue}
        />
    );
}

export default SortFilterComponent;