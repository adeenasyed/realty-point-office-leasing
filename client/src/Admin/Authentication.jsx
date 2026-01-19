import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Error from '@mui/icons-material/Error';
import Admin from './Admin'

function Authentication() {

    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState(false);

    useEffect(() => {
        axios.get(`/protected/api/checkAdminAuth`, { withCredentials: true })
        .then(response => {
            if (response.data.valid) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        })
        .catch(error => {
            setAuthenticated(false);
        });
    }, []);    

    const handlePasswordChange = (event) => { 
        setPassword(event.target.value);
        setIncorrect(false);
    }

    const handleSubmit = (event) => {
        axios.post(`/api/adminAuthentication`, { password })
        .then(response => {
            setAuthenticated(true);
        })
        .catch(error => {
            setIncorrect(true);
        });
    };

    if (authenticated) {
        return (<Admin/>);
    } else {
        return (
            <>
                <Dialog open={!authenticated}>
                    <DialogContent>
                        <DialogContentText sx={{color: 'black'}}>Password:</DialogContentText>
                        <TextField
                            fullWidth
                            type="password"
                            variant="standard"
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit();
                            }
                            }}
                        />
                        {incorrect &&
                            <Typography sx={{paddingTop: 1, fontWeight: 700, color: 'red'}}>
                                <Error sx={{marginRight: '2px', marginBottom: '4px', fontSize: '20px'}}/> Incorrect password
                            </Typography>   
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}>Login</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default Authentication;