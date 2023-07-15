import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExplore from "../../interfaces/AppState/IExploreState";
import { Waypoint } from "../../pages/Explore/Explore";

const initialState: IExplore = {
	
};

export const explorePageSlice = createSlice({
	name: "explore-page-slice",
	initialState,
	reducers: {
        setSelectedRoute: (state, action: PayloadAction<string>) => {
            return {...state, selectedRoute: action.payload };
        },
		setSelectedWayPoints: (state, action: PayloadAction<Waypoint[]>) => {
			return {...state, selectedWayPoints: action.payload };
		}
	}
});

export const { setSelectedRoute, setSelectedWayPoints } = explorePageSlice.actions;
export default explorePageSlice.reducer;