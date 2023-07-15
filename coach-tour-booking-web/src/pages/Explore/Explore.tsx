import { Autocomplete, Button, Divider, TextField, Typography } from "@mui/material";
import LookupService from "../../services/LookupService";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { ICityCountryPair } from "../../mock_data/SupportedEUCountries";
import { LatLng, getGeocode, getLatLng } from "use-places-autocomplete";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Map from "../../components/Map/Map";
import { Map as MapType } from "../../components/Map/Map";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";
import { pageTexts } from "../../app_data/AllText";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import SearchIcon from '@mui/icons-material/Search';
import RouteList from "../../components/JourneyRoutes/RouteList";
import JourneyService from "../../services/JourneyService";
import IRouteCard from "../../components/JourneyRoutes/IRouteCard";
import './Explore.css'
import { useAppSelector } from "../../store/Hooks";

export type Direction = google.maps.DirectionsResult;
export type Waypoint = google.maps.DirectionsWaypoint;

export default function Explore() {

	const mapRef = useRef<MapType>();

	const currentWayPoints = useAppSelector(state => state.explorePage.selectedWayPoints);

    const [origin, setOrigin] = useState<ICityCountryPair | null>(null);
	const [originCoords, setOriginCoords] = useState<LatLng | null>();
	
    const [destination, setDestination] = useState<ICityCountryPair | null>(null);
	const [destinationCoords, setDestinationCoords] = useState<LatLng | null>();

	const [directions, setDirections] = useState<Direction | null>();
	const [euCountries, setEuCountries] = useState<ICityCountryPair[]>([]);

	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);

	const [routes, setRoutes] = useState<IRouteCard[]>([]);

	async function initializeOrigin(cityCountryPair: ICityCountryPair|null) {
		setOrigin(cityCountryPair);

		if (cityCountryPair != null) {
			const geoCode = await getGeocode({
				address: `${cityCountryPair?.city}, ${cityCountryPair?.country}`
			});

			const oLatLng = await getLatLng(geoCode[0]);
			setOriginCoords(oLatLng);
			mapRef.current?.panTo(oLatLng);
		} else setOriginCoords(null);
	}

	async function initializeDestination(cityCountryPair: ICityCountryPair|null) {
		setDestination(cityCountryPair);

		if (cityCountryPair != null) {
			const geoCode = await getGeocode({
				address: `${cityCountryPair?.city}, ${cityCountryPair?.country}`
			});

			const dLatLng = await getLatLng(geoCode[0]);
			setDestinationCoords(dLatLng);
			mapRef.current?.panTo(dLatLng);
		} else setDestinationCoords(null);
	}

	const getDirections = useCallback(async () => {
		const directionsService = new google.maps.DirectionsService();
		console.log(originCoords, destinationCoords, currentWayPoints);
		await directionsService.route(
			{
				origin: originCoords as LatLng,
				destination: destinationCoords as LatLng,
				travelMode: google.maps.TravelMode.DRIVING,
				waypoints: currentWayPoints,
				optimizeWaypoints: true
			}, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					setDirections(result);
				}
			}
		)
	}, [originCoords, destinationCoords, currentWayPoints])

	useEffect(() => {
		if (originCoords != null && destinationCoords != null) {
			getDirections()
		}
	}, [originCoords, destinationCoords, getDirections])

	// Getting the EU countries and cities
    useEffect(() => {
        async function fetchEUCountries() {
            const lookUpService = new LookupService();
            const data = await lookUpService.getAllEUNations;
            setEuCountries(data);
        }

        fetchEUCountries();
    }, [])

	useEffect(() => {
		async function fetchAllRoutes() {
			const journeyService = new JourneyService();
			const data = await journeyService.getRoutesForJourney(
				origin as ICityCountryPair, 
				destination as ICityCountryPair,
				startDate as Dayjs,
				endDate as Dayjs,
			);

			setRoutes(data);
		}

		if (origin != null && destination != null && startDate != null && endDate != null) {
			fetchAllRoutes();
		}

	}, [origin, destination, startDate, endDate])

	const dirRendererRef = useRef<DirectionsRenderer | null>(null);

    return (
		<div className="vertical-flex-container">
			<Typography variant="h5">{pageTexts.explore.title}</Typography>
			<Typography variant="body2">{pageTexts.explore.subTitle}</Typography>
			<div className="explore-toolbar">
				<Autocomplete
					id="grouped-demo"
					options={euCountries.filter((c) => c !== destination)}
					groupBy={(c) => c.country}
					getOptionLabel={(c) => c.city}
					sx={{ width: 200 }}
					size="small"
					onChange={(event, value) => initializeOrigin(value)}
					renderInput={(params) => (
						<TextField {...params} label="Origin" />
					)}
				/>
				<div className="ltr_arrow">
					<ArrowForwardIcon/>
				</div>
				<Autocomplete
					id="grouped-demo"
					options={euCountries.filter((c) => c !== origin)}
					groupBy={(c) => c.country}
					getOptionLabel={(c) => c.city}
					sx={{ width: 200 }}
					size="small"
					onChange={(event, value) => initializeDestination(value)}
					renderInput={(params) => (
						<TextField {...params} label="Destination" />
					)}
				/>
				<Divider orientation="vertical" variant="middle" flexItem />
				<DatePicker onChange={(d: Dayjs | null) => { setStartDate(d) }} maxDate={endDate?.add(-1, 'day')} disablePast={true} formatDensity="spacious" label="Starting from" slotProps={{
					textField: {
						sx: { width: '210px' },
						size: 'small',
					}
				}} />
				<div className="ltr_arrow">
					<ArrowForwardIcon/>
				</div>
				<DatePicker onChange={(d: Dayjs | null) => { setEndDate(d) }} minDate={startDate?.add(1, 'day')} disablePast={true} formatDensity="spacious" label="Until" slotProps={{
					textField: {
						sx: { width: '210px' },
						size: 'small',
					}
				}} />
				<Divider orientation="vertical" variant="middle" flexItem />
				<Button variant="outlined" endIcon={<SearchIcon/>} size="medium">Search</Button>
			</div>
			<div className="horizontal-flex-container">
				<Map ref={mapRef as RefObject<MapType>}>
					<>
						<Marker visible={originCoords != null && directions == null} position={originCoords as LatLng} />
						<Marker visible={destinationCoords != null && directions == null} position={destinationCoords as LatLng} />
						{
							directions && <DirectionsRenderer options={
								{
									draggable: false,
									polylineOptions: {
										strokeColor: "#78ba14",
										strokeWeight: 3,
									},
								}
							} directions={directions} ref={dirRendererRef} onDirectionsChanged={() => {
								/* const directions = dirRendererRef.current?.state.directionsRenderer?.getDirections();
								const rawWayPts = ((directions as any)?.request.waypoints as any[])?.map(wp => {
									if (wp != null) {
										return {
											lat: wp.location.lat(),
											lng: wp.location.lng(),
										}
									}
								});
								const transformedWayPoints = rawWayPts?.map(w => {
									const reducedWayPt: google.maps.DirectionsWaypoint = {
										location: {
											lat: w?.lat,
											lng: w?.lng,
										},
										stopover: false
									}

									return reducedWayPt;
								})

								console.log(transformedWayPoints); */
							}}/>
						}
					</>
				</Map>
				<Divider orientation="vertical" variant="middle" flexItem />
				<RouteList routeInfo={routes as IRouteCard[]}/>
			</div>
		</div>
	);
}