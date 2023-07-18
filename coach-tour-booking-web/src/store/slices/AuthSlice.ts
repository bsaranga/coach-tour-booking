import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
    authenticationStatus: boolean;
}

const initialState: IAuth = {
    authenticationStatus: false,
};

export const authSlice = createSlice({
	name: "auth-slice",
	initialState,
	reducers: {
        setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
            return {...state, directions: action.payload };
        },
	}
});

export const { setAuthenticationStatus } = authSlice.actions;
export default authSlice.reducer;