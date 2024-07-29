import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const initialState: {
	currentSelection: string | null
} = {
	currentSelection: null
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
				providesTags: [{ type: 'CalendarEvents', id: 'index' }]
			}),
			fetchEventById: builder.query<APICalendarEvent, string>({
				query(id) {
					return `/events/${id}`
				},
				providesTags: (results, error, id) => [{ type: 'CalendarEvents', id }]
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
				invalidatesTags: [{ type: 'CalendarEvents', id: 'index' }]
			}),
			updateEvent: builder.mutation<APICalendarEvent, APICalendarEvent>({
				query(body) {
					return {
						url: 'events',
						method: 'PATCH',
						body
					}
				},
				invalidatesTags: (results, error, { id }) => [
					{ type: 'CalendarEvents', id: 'index' },
					{ type: 'CalendarEvents', id }
				]
			})
		}
	}
})

const calendarEventsSlice = createSlice({
	name: 'calendarEvents',
	initialState,
	reducers: {
		setCurrentSelection(state, action: PayloadAction<string | null>) {
			state.currentSelection = action.payload
		}
	}
})

export const { setCurrentSelection } = calendarEventsSlice.actions

export default calendarEventsSlice.reducer
