import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

function AmenitiesGrid({items}) { 
    return (
        <Grid container spacing={2}>
            {items.map((item, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
                    <Card sx={{ boxShadow: 'none' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.icon}
                            </Box>
                            <Typography align="center" sx={{ marginTop: 2 }}>
                                {item.text}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid> 
    )

}

export default AmenitiesGrid;