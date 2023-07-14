import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import IRouteCard from './IRouteCard';

export default function RouteCard(props: IRouteCard) {
    
    const { journeyDate, startCity, endCity, journeyImgUrl, distance, distanceUnit, travelTime } = props;

    return (
    <Card elevation={2} sx={{ display: 'flex', width: '24rem', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant='caption' color="text.secondary">{journeyDate}</Typography>
            <Typography component="div" variant="h6">
                {startCity} to {endCity}
            </Typography>
            <Box sx={{
                display: "flex",
                gap: "4px"
            }}>
                <Chip size='small' label={`${distance} ${distanceUnit}`} />
                <Chip size='small' label={travelTime} />
            </Box>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button>Book Now</Button>
        </Box>
        </Box>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={journeyImgUrl}
        />
    </Card>
    );
}
