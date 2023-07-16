import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExplore from "../../interfaces/AppState/IExploreState";
import { Direction, Waypoint } from "../../pages/Explore/Explore";
import { ICityCountryPair } from "../../mock_data/SupportedEUCountries";
import { LatLng } from "use-places-autocomplete";
import dayjs, { Dayjs } from "dayjs";

const initialState: IExplore = {
	startDate: dayjs(),
    endDate: dayjs().endOf('month'),
};

export const explorePageSlice = createSlice({
	name: "explore-page-slice",
	initialState,
	reducers: {
		setOrigin: (state, action: PayloadAction<ICityCountryPair>) => {
            return {...state, origin: action.payload };
        },
		setOriginCoords: (state, action: PayloadAction<LatLng | null>) => {
            return {...state, originCoords: action.payload };
        },
		setDestination: (state, action: PayloadAction<ICityCountryPair>) => {
            return {...state, destination: action.payload };
        },
		setDestinationCoords: (state, action: PayloadAction<LatLng | null>) => {
            return {...state, destinationCoords: action.payload };
        },
        setSelectedRoute: (state, action: PayloadAction<string>) => {
            return {...state, selectedRoute: action.payload };
        },
		setSelectedWayPoints: (state, action: PayloadAction<Waypoint[]>) => {
			return {...state, selectedWayPoints: action.payload };
		},
        setStartDate: (state, action: PayloadAction<Dayjs | null>) => {
            return {...state, startDate: action.payload };
        },
        setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
            return {...state, endDate: action.payload };
        },
        setDirections: (state, action: PayloadAction<Direction | null>) => {
            return {...state, directions: action.payload };
        },
	}
});

export const {
	setOrigin,
	setOriginCoords,
	setDestination,
	setDestinationCoords,
	setSelectedRoute,
	setSelectedWayPoints,
	setStartDate,
	setEndDate,
	setDirections
} = explorePageSlice.actions;
  
export default explorePageSlice.reducer;