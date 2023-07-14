import { Autocomplete, TextField, Typography } from "@mui/material";
import LookupService from "../services/LookupService";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { ICityCountryPair } from "../mock_data/SupportedEUCountries";
import { LatLng, getGeocode, getLatLng } from "use-places-autocomplete";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Map from "../components/Map/Map";
import { Map as MapType } from "../components/Map/Map";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";

type Direction = google.maps.DirectionsResult;

export default function Explore() {

	const mapRef = useRef<MapType>();

    const [origin, setOrigin] = useState<ICityCountryPair | null>(null);
	const [originCoords, setOriginCoords] = useState<LatLng | null>();
	
    const [destination, setDestination] = useState<ICityCountryPair | null>(null);
	const [destinationCoords, setDestinationCoords] = useState<LatLng | null>();

	const [directions, setDirections] = useState<Direction | null>();
    
	const [euCountries, setEuCountries] = useState<ICityCountryPair[]>([]);

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
		await directionsService.route(
			{
				origin: originCoords as LatLng,
				destination: destinationCoords as LatLng,
				travelMode: google.maps.TravelMode.DRIVING
			}, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					setDirections(result);
				}
			}
		)
	}, [originCoords, destinationCoords])

	useEffect(() => {
		if (originCoords != null && destinationCoords != null) {
			getDirections()
		}
	}, [originCoords, destinationCoords, getDirections])

    useEffect(() => {
        async function fetchEUCountries() {
            const lookUpService = new LookupService();
            const data = await lookUpService.getAllEUNations;
            setEuCountries(data);
        }

        fetchEUCountries();
    }, [])

    return (
		<div className="vertical-flex-container">
			<Typography variant="h5">Explore</Typography>
			<div className="horizontal-flex-container">
				<Autocomplete
					id="grouped-demo"
					options={euCountries.filter((c) => c !== destination)}
					groupBy={(c) => c.country}
					getOptionLabel={(c) => c.city}
					sx={{ width: 165 }}
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
					sx={{ width: 165 }}
					size="small"
					onChange={(event, value) => initializeDestination(value)}
					renderInput={(params) => (
						<TextField {...params} label="Destination" />
					)}
				/>
			</div>
			<Map ref={mapRef as RefObject<MapType>}>
				<>
					<Marker visible={originCoords != null} position={originCoords as LatLng} />
					<Marker visible={destinationCoords != null} position={destinationCoords as LatLng} />
					{
						directions && <DirectionsRenderer directions={directions} />
					}
				</>
			</Map>
		</div>
	);
}