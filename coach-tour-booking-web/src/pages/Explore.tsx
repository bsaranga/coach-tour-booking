import { Autocomplete, TextField, Typography } from "@mui/material";
import LookupService from "../services/LookupService";
import { useEffect, useState } from "react";
import { ICityByCountry } from "../mock_data/SupportedEUCountries";

export default function Explore() {
    const [euCountries, setEuCountries] = useState<ICityByCountry[]>([]);

    useEffect(() => {
        async function fetchEUCountries() {
            const lookUpService = new LookupService();
            const data = await lookUpService.getAllEUNations;
            setEuCountries(data);
        }

        fetchEUCountries();
    }, [])

    return (
        <>
            <Typography variant="h5">Explore</Typography>
            <Autocomplete
                id="grouped-demo"
                options={euCountries}
                groupBy={(c) => c.country}
                getOptionLabel={c => c.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="With categories" />}
            />
        </>
    )
}