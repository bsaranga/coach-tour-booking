import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import explorePage from "./slices/ExploreSlice";

export const listener = createListenerMiddleware();

const store = configureStore({
	reducer: {
		explorePage
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listener.middleware)
});

export const dispatcher = store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;