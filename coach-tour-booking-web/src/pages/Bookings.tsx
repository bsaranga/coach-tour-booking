import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from "@mui/material";
import { pageTexts } from "../app_data/AllText";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/Hooks";
import JourneyService from "../services/JourneyService";
import IRouteCard from "../components/JourneyRoutes/IRouteCard";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RouteIcon from '@mui/icons-material/Route';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import EuroIcon from '@mui/icons-material/Euro';
import { ICoachType } from "../mock_data/CoachTypes";
import { DatePicker } from "@mui/x-date-pickers";

export default function Bookings() {

    const [routeInfo, setRouteInfo] = useState<IRouteCard>();
    const [coachInfo, setCoachInfo] = useState<ICoachType>();
    const { selectedRoute, startDate, endDate } = useAppSelector(state => state.explorePage);

    useEffect(() => {
        async function getRouteInfoForJourney() {
            const journeyService = new JourneyService();
            if (selectedRoute != null) {
                const routeInfo = await journeyService.getRouteInfoById(selectedRoute);
                setRouteInfo(routeInfo);
            }
        }

        async function getCoachInfoForJourney() {
            const journeyService = new JourneyService();
            if (selectedRoute != null) {
                const coachInfo = await journeyService.getCoachInfoByRouteId(selectedRoute);
                setCoachInfo(coachInfo);
            }
        }

        getRouteInfoForJourney();
        getCoachInfoForJourney();
    }, [selectedRoute])
    
    return (
        <div className="vertical-flex-container">
            <Typography variant="h5">{pageTexts.bookings.title}</Typography>
			<Typography variant="body2">{pageTexts.bookings.subTitle}</Typography>
            <Box display='flex' justifyContent='center' flexGrow={1}>
                <Card sx={{ width: 540 }}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={routeInfo?.journeyImgUrl}
                    />
                    <CardContent>
                        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{
                            marginRight: "1rem", marginLeft: "1rem"
                        }}>
                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' gap={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        {routeInfo?.startCity}
                                    </Typography>
                                    <div className="ltr_arrow">
                                        <ArrowForwardIcon sx={{ fontSize: "16px" }} />
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        {routeInfo?.endCity}
                                    </Typography>
                                </Box>
                                <Typography gutterBottom variant="h5" component="div">
                                    {routeInfo?.routeName}
                                </Typography>
                                <Box display='flex' gap={1} flexWrap='wrap'>
                                    <Box display='flex' gap={1} alignItems='center'>
                                        <RouteIcon fontSize="small" htmlColor="#6b6b6b"/>
                                        <Typography variant="caption" color="text.secondary">
                                            {`${routeInfo?.distance} ${routeInfo?.distanceUnit}`}
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box display='flex' gap={0.5} alignItems='center'>
                                        <AvTimerIcon fontSize="small" htmlColor="#6b6b6b"/>
                                        <Typography variant="caption" color="text.secondary">
                                            {routeInfo?.travelTime}
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box display='flex' gap={0.5} alignItems='center'>
                                        <DirectionsBusFilledIcon fontSize="small" htmlColor="#6b6b6b"/>
                                        <Typography variant="caption" color="text.secondary">
                                            {coachInfo?.coachName}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display='flex' gap={0.25} flexDirection='column' alignItems='center'>
                                <Box display='flex' gap={1} alignItems='center'>
                                    <AirlineSeatReclineExtraIcon htmlColor="#6b6b6b"/>
                                    <Typography variant="h5" color="text.secondary">
                                        ?/{coachInfo?.seatCapacity}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Seats Remaining
                                </Typography>
                            </Box>
                        </Box>
                        <Divider orientation="horizontal" sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }} />
                        <Box display='flex' flexDirection='column' gap={2}>
                            <Box display='flex' gap={1}>
                                <DatePicker disablePast={true} minDate={startDate} maxDate={endDate} formatDensity="spacious" label="Select journey date" slotProps={{
                                    textField: {
                                        sx: { width: '210px' },
                                        size: 'small',
                                    }
                                }} />
                                <TextField sx={{ width: '9rem'}} label='# of Adults' type="number" size="small" onKeyDown={(e) => {
                                    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                    e.preventDefault()
                                    }
                                }} />
                                <TextField sx={{ width: '9rem'}} label='# of Children' type="number" size="small" onKeyDown={(e) => {
                                    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                    e.preventDefault()
                                    }
                                }} />
                            </Box>
                            <Box display='flex' alignItems='center' gap={0.45}>
                                <EuroIcon fontSize="large" htmlColor="#6b6b6b" />
                                <Typography variant="h4">
                                    625
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Book</Button>
                    </CardActions>
                </Card>
            </Box> 
        </div>
    )
}