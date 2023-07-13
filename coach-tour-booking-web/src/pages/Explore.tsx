import { Autocomplete, TextField, Typography } from "@mui/material";
import LookupService from "../services/LookupService";
import { useEffect, useState } from "react";
import { ICityCountryPair } from "../mock_data/SupportedEUCountries";
import Map from "../components/Map/Map";

export default function Explore() {
    const [origin, setOrigin] = useState<ICityCountryPair | null>(null);
    const [destination, setDestination] = useState<ICityCountryPair | null>(null);
    const [euCountries, setEuCountries] = useState<ICityCountryPair[]>([]);

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
					onChange={(event, value) => setOrigin(value)}
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
					onChange={(event, value) => setDestination(value)}
					renderInput={(params) => (
						<TextField {...params} label="Destination" />
					)}
				/>
			</div>
			<Map />
		</div>
	);
}