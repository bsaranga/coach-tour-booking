import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export default function Navigation() {
    const [tabValue, setTabValue] = useState(0);
    
    function handleChange(event: SyntheticEvent, tabVal: number) {
        setTabValue(tabVal);
    }

    return (
        <Tabs value={tabValue} onChange={handleChange} centered>
            <Tab sx={{ textTransform: "none"}} label="Bookings" />
            <Tab sx={{ textTransform: "none"}} label="Luggage" />
            <Tab sx={{ textTransform: "none"}} label="Itenary" />
            <Tab sx={{ textTransform: "none"}} label="Past Journeys" />
        </Tabs>
    )
}