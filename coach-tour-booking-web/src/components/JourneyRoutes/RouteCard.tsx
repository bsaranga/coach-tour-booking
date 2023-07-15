import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IRouteCard from './IRouteCard';
import { useAppDispatch, useAppSelector } from '../../store/Hooks';
import { setSelectedRoute, setSelectedWayPoints } from '../../store/slices/ExploreSlice';
import { useId } from 'react';
import showToast from '../../services/ToastService';
import { Waypoint } from '../../pages/Explore/Explore';

export default function RouteCard(props: IRouteCard) {

    const id = useId()
    const dispatch = useAppDispatch();
    const selectedRouteId = useAppSelector(state => state.explorePage.selectedRoute);

    const { routeId, journeyDate, startCity, routeName, endCity, journeyImgUrl, distance, distanceUnit, travelTime, waypoints } = props;

    function handleSelection() {
        dispatch(setSelectedRoute(routeId));
        dispatch(setSelectedWayPoints(waypoints as Waypoint[]));
        showToast(id, `${routeName} route selected`, 'success', dispatch);
    }

    return (
    <Card elevation={2} sx={{ display: 'flex', width: '24rem', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant='caption' color="text.secondary">{journeyDate}</Typography>
                <Box display={'flex'} gap={0.5}>
                    <Typography component="div" variant="caption">{startCity}</Typography>
                    <div className="ltr_arrow">
                        <ArrowForwardIcon sx={{ fontSize: "16px" }} />
                    </div>
                    <Typography component="div" variant="caption">{endCity}</Typography>
                </Box>
                <Typography component="div" variant="h6">
                    <Box display='flex' alignItems='center' gap={0.5}>
                        { routeName }
                        { (selectedRouteId && (selectedRouteId === routeId)) && <CheckCircleOutlineIcon htmlColor='#6dbf0a'/> }
                    </Box>
                </Typography>
                <Box sx={{ display: "flex", gap: "4px", flexWrap: 'wrap' }}>
                    <Chip size='small' label={`${distance} ${distanceUnit}`} />
                    <Chip size='small' label={travelTime} />
                    <Chip size='small' label={"10 seats remaining"} />
                </Box>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button sx={{ textTransform: "none" }} onClick={handleSelection} disabled={selectedRouteId === routeId} >Select</Button>
                <Button sx={{ textTransform: "none" }}>Book Now</Button>
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
