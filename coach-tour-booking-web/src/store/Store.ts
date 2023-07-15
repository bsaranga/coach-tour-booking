import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import explorePage from "./slices/ExploreSlice";
import toastSlice from './slices/ToastSlice';

export const listener = createListenerMiddleware();

const store = configureStore({
	reducer: {
		explorePage,
		toastSlice
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listener.middleware)
});

export const dispatcher = store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;