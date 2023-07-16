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
import RouteList from "../../components/JourneyRoutes/RouteList";
import JourneyService from "../../services/JourneyService";
import IRouteCard from "../../components/JourneyRoutes/IRouteCard";
import './Explore.css'
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setDestination, setDestinationCoords, setDirections, setEndDate, setOrigin, setOriginCoords, setStartDate } from "../../store/slices/ExploreSlice";

export type Direction = google.maps.DirectionsResult;
export type Waypoint = google.maps.DirectionsWaypoint;

export default function Explore() {

	const mapRef = useRef<MapType>();
	const dispatch = useAppDispatch();

	const [routes, setRoutes] = useState<IRouteCard[]>([]);
	const [euCountries, setEuCountries] = useState<ICityCountryPair[]>([]);
	
	const currentWayPoints = useAppSelector(state => state.explorePage.selectedWayPoints);
	const { origin, originCoords, destination, destinationCoords, directions, startDate, endDate } = useAppSelector(state => state.explorePage)

	async function initializeOrigin(cityCountryPair: ICityCountryPair) {
		dispatch(setOrigin(cityCountryPair));

		if (cityCountryPair != null) {
			const geoCode = await getGeocode({
				address: `${cityCountryPair?.city}, ${cityCountryPair?.country}`
			});

			const oLatLng = await getLatLng(geoCode[0]);
			dispatch(setOriginCoords(oLatLng));
			mapRef.current?.panTo(oLatLng);
		} else dispatch(setOriginCoords(null));
	}

	async function initializeDestination(cityCountryPair: ICityCountryPair) {
		dispatch(setDestination(cityCountryPair))

		if (cityCountryPair != null) {
			const geoCode = await getGeocode({
				address: `${cityCountryPair?.city}, ${cityCountryPair?.country}`
			});

			const dLatLng = await getLatLng(geoCode[0]);
			dispatch(setDestinationCoords(dLatLng));
			mapRef.current?.panTo(dLatLng);
		} else dispatch(setDestinationCoords(null));
	}

	const getDirections = useCallback(async () => {
		const directionsService = new google.maps.DirectionsService();
		console.log(originCoords, destinationCoords, currentWayPoints);
		await directionsService.route(
			{
				origin: originCoords as LatLng,
				destination: destinationCoords as LatLng,
				travelMode: google.maps.TravelMode.DRIVING,
				waypoints: currentWayPoints
			}, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					dispatch(setDirections(result));
				}
			}
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
					value={origin}
					id="grouped-demo"
					options={euCountries.filter((c) => c !== destination)}
					groupBy={(c) => c.country}
					getOptionLabel={(c) => c.city}
					sx={{ width: 200 }}
					size="small"
					onChange={(event, value) => initializeOrigin(value as ICityCountryPair)}
					renderInput={(params) => (
						<TextField {...params} label="Origin" />
					)}
				/>
				<div className="ltr_arrow">
					<ArrowForwardIcon/>
				</div>
				<Autocomplete
					value={destination}
					id="grouped-demo"
					options={euCountries.filter((c) => c !== origin)}
					groupBy={(c) => c.country}
					getOptionLabel={(c) => c.city}
					sx={{ width: 200 }}
					size="small"
					onChange={(event, value) => initializeDestination(value as ICityCountryPair)}
					renderInput={(params) => (
						<TextField {...params} label="Destination" />
					)}
				/>
				<Divider orientation="vertical" variant="middle" flexItem />
				<DatePicker value={startDate} onChange={(d: Dayjs | null) => { dispatch(setStartDate(d)) }} maxDate={endDate?.add(-1, 'day')} disablePast={true} formatDensity="spacious" label="Starting from" slotProps={{
					textField: {
						sx: { width: '210px' },
						size: 'small',
					}
				}} />
				<div className="ltr_arrow">
					<ArrowForwardIcon/>
				</div>
				<DatePicker value={endDate} onChange={(d: Dayjs | null) => { dispatch(setEndDate(d)) }} minDate={startDate?.add(1, 'day')} disablePast={true} formatDensity="spacious" label="Until" slotProps={{
					textField: {
						sx: { width: '210px' },
						size: 'small',
					}
				}} />
				<Divider orientation="vertical" variant="middle" flexItem />
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