import { Autocomplete, TextField, Typography } from "@mui/material";
import LookupService from "../services/LookupService";

export default function Explore() {
    const lookUpService = new LookupService();
    const allCities: any[] = [];

    lookUpService.getAllEUNations.then(res => {
        allCities.concat(res);
    })

    return (
        <>
            <Typography variant="h5">Explore</Typography>
            <Autocomplete
                id="grouped-demo"
                options={allCities}
                groupBy={(c) => c.country}
                getOptionLabel={c => c.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="With categories" />}
            />
        </>
    )
}