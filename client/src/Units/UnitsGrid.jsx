import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

function UnitsGrid({ loading, placeholders, units }) {

    if (loading) { 
        return (
            <Grid container spacing={3}>
                {placeholders.map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index} align="center">
                        <Skeleton variant="rectangular" sx={{width: "100%", height: "365px", borderRadius: "5px"}} />
                    </Grid>
                ))}
            </Grid>
        )
    } else { 
        return (
            <Grid container spacing={3}>
                {units.map((unit) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={unit._id} align="center" >
                        <Card sx={{width: "100%"}}>
                            <CardActionArea component={Link} to={`/units/${unit._id}`}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: "250px", 
                                        objectFit: 'cover'
                                    }}
                                    image={`/photos/${unit.type === "work desk" ? "Work Desk" : unit.name}/${unit.images[0]}.jpg`}
                                />
                                <CardContent align="left">
                                    <Typography gutterBottom sx={{fontWeight: 700, fontSize: '20px'}}>
                                        {unit.name}
                                    </Typography>
                                    <Typography sx={{fontSize: '15px'}}>
                                        Daily Rate: ${unit.daily_rent}.00
                                    </Typography>
                                    <Typography sx={{fontSize: '15px'}}>
                                        Monthly Rate: ${unit.monthly_rent}.00
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default UnitsGrid;
