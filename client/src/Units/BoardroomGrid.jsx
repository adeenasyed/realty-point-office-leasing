import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

function BoardroomGrid({ loading, boardroom }) {

    if (loading) { 
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Skeleton variant="rectangular" sx={{width: "100%", height: "365px", borderRadius: "5px"}} />
                </Grid>
            </Grid>
        )
    } else { 
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card sx={{width: "100%"}}>
                        <CardActionArea component={Link} to={`/units/boardroom/${boardroom._id}`}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: "250px", 
                                    objectFit: 'cover'
                                }}
                                image={`photos/Boardroom/${boardroom.images[0]}.jpg`}
                            />
                            <CardContent align="left">
                                <Typography gutterBottom sx={{fontWeight: 700, fontSize: '20px'}}>
                                    {boardroom.name}
                                </Typography>
                                <Typography sx={{fontSize: '15px'}}>
                                    Hourly Rate: ${boardroom.hourly_rent}.00
                                </Typography>
                                <Typography sx={{fontSize: '15px'}}>
                                    Max Rate: ${boardroom.max_rent}.00
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default BoardroomGrid;
