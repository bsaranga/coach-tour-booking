import { Box, Button, Card, CardContent, CardMedia, Divider, TextField, Typography } from "@mui/material";
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
import { DateTimePicker } from "@mui/x-date-pickers";
import LuggageIcon from '@mui/icons-material/Luggage';
import { Dayjs } from "dayjs";

export default function Bookings() {

    const [routeInfo, setRouteInfo] = useState<IRouteCard>();
    const [coachInfo, setCoachInfo] = useState<ICoachType>();
    const { selectedRoute, startDate, endDate } = useAppSelector(state => state.explorePage);

    const [journeyDate, setJourneyDate] = useState<Dayjs>();
    const [dateTimeValidationErr, setDateTimeValidationErr] = useState<string>();

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
            { selectedRoute == null ?
                <Box display='flex' justifyContent='center' flexGrow={1} alignItems='center'>
                    <Typography variant="subtitle1">Select a route from 'Explore' page</Typography>
                </Box> :
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
                            <Box display='flex' gap={1} justifyContent='center'>
                                <DateTimePicker
                                    ampm={false}
                                    disablePast
                                    minDate={startDate}
                                    maxDate={endDate}
                                    closeOnSelect={false}
                                    skipDisabled={true}
                                    shouldDisableTime={(v, tv) => {
                                        const timeOnly = v?.toISOString().split('T')[1].split('.')[0].slice(0,5) as string;
                                        return !(timeOnly === "08:00");
                                    }}
                                    label="Select journey date/time"
                                    onChange={(val, context) => {
                                        if (context.validationError) {
                                            setDateTimeValidationErr('Invalid Date/Time');
                                        } else setDateTimeValidationErr('');
                                        setJourneyDate(val as Dayjs) 
                                    }}
                                    slotProps={{
                                        textField: {
                                            sx: { width: '230px' },
                                            size: 'small',
                                            helperText: dateTimeValidationErr,
                                        },
                                    }}
                                />
                                <TextField sx={{ width: '7.5rem'}} label='# of Adults' type="number" size="small" onKeyDown={(e) => {
                                    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                        e.preventDefault();
                                    }
                                }} />
                                <TextField sx={{ width: '7.5rem'}} label='# of Children' type="number" size="small" onKeyDown={(e) => {
                                    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
                                        e.preventDefault();
                                    }
                                }} />
                            </Box>
                            <Box display='flex' alignItems='center' justifyContent='space-between' gap={0.45}>
                                <Box display='flex' gap={0.5} alignItems='center'>
                                    <LuggageIcon fontSize="small" htmlColor="#6b6b6b"/>
                                    <Typography variant="caption" color="text.secondary">
                                        Standard Luggage (5kg)
                                    </Typography>
                                </Box>
                                <Button size="small" variant="contained" sx={{ textTransform: 'none' }}>Add Additional Luggage</Button>
                            </Box>
                            <Divider orientation="horizontal" sx={{
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                            }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Box display='flex' flexDirection='column'>
                                    <Typography variant="caption" color="text.secondary">2 Adult Seats</Typography>
                                    <Typography variant="caption" color="text.secondary">1 Child Seat</Typography>
                                    <Typography variant="caption" color="text.secondary">Standard Luggage (5kg)</Typography>
                                </Box>
                                <Box display='flex'>
                                    <EuroIcon fontSize="large" htmlColor="#6b6b6b" />
                                    <Typography variant="h4">
                                        625
                                    </Typography>
                                </Box>
                            </Box>
                            <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>Book Now</Button> 
                        </Box>
                    </CardContent>
                </Card>
                </Box>
            } 
        </div>
    )
}