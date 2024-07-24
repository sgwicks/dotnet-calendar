import { configureStore } from '@reduxjs/toolkit'
import calendarEventsReducer, {
	calendarEventsApiSlice
} from '../features/calendarEvents/calendarEventsSlice'

export const store = configureStore({
	reducer: {
		calendarEvents: calendarEventsReducer,
		[calendarEventsApiSlice.reducerPath]: calendarEventsApiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(calendarEventsApiSlice.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
