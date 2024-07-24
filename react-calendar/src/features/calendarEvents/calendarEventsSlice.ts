import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const initialState: {
	calendarEvents: APICalendarEvent[]
} = {
	calendarEvents: []
}

export const calendarEventsApiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5199'
	}),
	endpoints(builder) {
		return {
			fetchEvents: builder.query<
				APICalendarEvent[],
				{ start: string; end: string }
			>({
				query({ start, end }) {
					return `/events?start=${start}&end=${end}`
				}
			})
		}
	}
})

const calendarEventsSlice = createSlice({
	name: 'calendarEvents',
	initialState,
	reducers: {}
})

export default calendarEventsSlice.reducer
