import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExplore from "../../interfaces/AppState/IExploreState";
import { LatLng } from "use-places-autocomplete";

const initialState: IExplore = {
	
};

export const explorePageSlice = createSlice({
	name: "explore-page-slice",
	initialState,
	reducers: {
        setOriginLatLng: (state, action: PayloadAction<LatLng>) => {
            return {...state, originLatLng: action.payload};
        },
        setDestinationLatLng: (state, action: PayloadAction<LatLng>) => {
            return {...state, destinationLatLng: action.payload};
        }
	}
});

export const { setOriginLatLng, setDestinationLatLng } = explorePageSlice.actions;
export default explorePageSlice.reducer;