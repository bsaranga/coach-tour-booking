import { Autocomplete, TextField, Typography } from "@mui/material";
import LookupService from "../services/LookupService";
import { useEffect, useState } from "react";
import { ICityCountryPair } from "../mock_data/SupportedEUCountries";
import Map from "../components/Map/Map";
import { LatLng, getGeocode, getLatLng } from "use-places-autocomplete";

export default function Explore() {
    const [origin, setOrigin] = useState<ICityCountryPair | null>(null);
	const [originLatLng, setOriginLatLng] = useState<LatLng>();

    const [destination, setDestination] = useState<ICityCountryPair | null>(null);
	const [destinationLatLng, setDestinationLatLng] = useState<LatLng>();
    
	const [euCountries, setEuCountries] = useState<ICityCountryPair[]>([]);

	async function initializeOrigin(cityCountryPair: ICityCountryPair|null) {
		setOrigin(cityCountryPair);

		if (cityCountryPair != null) {
			const geoCode = await getGeocode({
				address: `${cityCountryPair?.city}, ${cityCountryPair?.country}`
			});

			const oLatLng = await getLatLng(geoCode[0]);
			console.log(oLatLng);
			setOriginLatLng(oLatLng);
		}
	}

	async function initializeDestination(cityCountryPair: ICityCountryPair|null) {
		setDestination(cityCountryPair);

		if (cityCountryPair != null) {
			const geoCode = await getGeocode({
				address: `${cityCountryPair?.city}, ${cityCountryPair?.country}`
			});

			const dLatLng = await getLatLng(geoCode[0]);
			console.log(dLatLng);
			setDestinationLatLng(dLatLng);
		}
	}

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
				<div
					style={{
						display: "flex",
						alignItems: "center",
						fontSize: "22px",
						color: "rgba(128,128,128)",
                        userSelect: "none",
					}}
				>
					{">"}
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
			<Map />
		</div>
	);
}