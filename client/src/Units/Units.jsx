import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import UnitsGrid from './UnitsGrid';
import BoardroomGrid from './BoardroomGrid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Footer from '../Footer/Footer';

function Units() {

    const [loading, setLoading] = useState(true);
    const placeholderRooms = new Array(7).fill(null);
    const placeholderDesks = new Array(5).fill(null);
    const [rooms, setRooms] = useState([]);
    const [desks, setDesks] = useState([]);
    const [boardroom, setBoardroom] = useState();

    const fetchUnits = async () => {
        try {
            const response = await axios.get(`/api/fetchUnits`);
            const data = response.data;
            setRooms(data.filter(unit => unit.type === 'private room').sort((a, b) => a.name - b.name));
            setDesks(data.filter(unit => unit.type === 'work desk').sort((a, b) => a.name - b.name));
            setBoardroom(data.find(unit => unit.type === 'boardroom'));
            setLoading(false);
        } catch (error) {/**/}
    };
  
    useEffect(() => {
        fetchUnits();
    }, []);

    return (
        <>
            <Header/>
            <Grid container paddingX={2}>
                <Grid container paddingY={6}>
                    <Grid item xs={12} paddingBottom={6}>
                        <Typography sx={{fontWeight: 700, fontSize: '35px'}}>Private Rooms</Typography>
                    </Grid>
                    <UnitsGrid loading={loading} placeholders={placeholderRooms} units={rooms}/>
                </Grid>

                <Grid container paddingBottom={6}>
                    <Grid item xs={12} paddingBottom={6}>
                        <Typography sx={{fontWeight: 700, fontSize: '35px'}}>Work Desks</Typography>
                    </Grid>
                    <UnitsGrid loading={loading} placeholders={placeholderDesks} units={desks}/>
                </Grid>

                <Grid container paddingBottom={6}>
                    <Grid item xs={12} paddingBottom={6}>
                        <Typography sx={{fontWeight: 700, fontSize: '35px'}}>Boardroom</Typography>
                    </Grid>
                    <BoardroomGrid loading={loading} boardroom={boardroom}/>
                </Grid>
            </Grid>
            <Footer/>
        </>
    );

} 
export default Units;