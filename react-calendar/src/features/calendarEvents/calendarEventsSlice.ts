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
	tagTypes: ['CalendarEvents'],
	endpoints(builder) {
		return {
			fetchEvents: builder.query<
				APICalendarEvent[],
				{ start: string; end: string }
			>({
				query({ start, end }) {
					return `/events?start=${start}&end=${end}`
				},
				providesTags: ['CalendarEvents']
			}),
			createEvent: builder.mutation<
				APICalendarEvent,
				Omit<APICalendarEvent, 'id'>
			>({
				query(body) {
					return {
						url: 'events',
						method: 'post',
						body
					}
				},
				invalidatesTags: ['CalendarEvents']
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
