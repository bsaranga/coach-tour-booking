import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExplore from "../../interfaces/AppState/IExploreState";

const initialState: IExplore = {
	
};

export const explorePageSlice = createSlice({
	name: "explore-page-slice",
	initialState,
	reducers: {
        setSelectedRoute: (state, action: PayloadAction<string>) => {
            return {...state, selectedRoute: action.payload };
        }
	}
});

export const { setSelectedRoute } = explorePageSlice.actions;
export default explorePageSlice.reducer;