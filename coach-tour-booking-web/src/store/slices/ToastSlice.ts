import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToastState } from "../../components/Toast/ToastFactory";

export interface IToastStateContainer {
    toasts: IToastState[];
}

const initialState: IToastStateContainer= {
    toasts: [],
};

export const toastSlice = createSlice({
	name: "toast-slice",
	initialState,
	reducers: {
        addToast: (state, action: PayloadAction<IToastState>) => {
            return { toasts: [...state.toasts, action.payload] };
        },
        hideToast: (state, action: PayloadAction<string>) => {
            return {
                toasts: state.toasts.map(t => {
                    if (t.toastId === action.payload) {
                        return {
                            ...t,
                            isOpen: false
                        };
                    }
                    return t;
                })
            };
        },
        removeToast: (state, action: PayloadAction<string>) => {
            return { toasts: state.toasts.filter(t => t.toastId !== action.payload ) }
        }
	}
});

export const { addToast, hideToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;