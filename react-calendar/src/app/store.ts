import { configureStore } from '@reduxjs/toolkit'
import calendarEventsReducer from '../features/calendarEvents/calendarEventsSlice'

export const store = configureStore({
	reducer: {
		calendarEvents: calendarEventsReducer
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
