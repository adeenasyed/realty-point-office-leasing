import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SearchComponent({inputValue, setInputValue, allOptions, label}) {
    
    const [options, setOptions] = useState([]);

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue) {
            const filteredNames = allOptions.filter(option => option.toLowerCase().includes(newInputValue.toLowerCase()));
            setOptions(filteredNames);
        } else {
            setOptions([]);
        }
    };

    return (
        <Autocomplete
            freeSolo
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    variant="standard"
                    label={`Search by ${label}`}
                />
            )}
            style={{ width: '225px' }}
            size="small"
        />
    );
}

export default SearchComponent;
