import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import explorePage from "./slices/ExploreSlice";
import toastSlice from './slices/ToastSlice';

export const listener = createListenerMiddleware();

const store = configureStore({
	reducer: {
		explorePage,
		toastSlice
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: ['explore-page-slice/setStartDate', 'explore-page-slice/setEndDate'],
			ignoredPaths: ['explorePage.startDate', 'explorePage.endDate'],
		}
	}).prepend(listener.middleware)
});

export const dispatcher = store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;