import { createSlice } from '@reduxjs/toolkit'

const initialState: {
	calendarEvents: APICalendarEvent[]
} = {
	calendarEvents: [
		{
			id: 'abcd-efg',
			title: 'meeting with Jeff',
			description: 'Lets sit down and have a chat',
			start: '2024-07-23 11:00:00+0100',
			end: '2024-07-23 12:00:00+0100',
			tier: 0
		},
		{
			id: '1234-567',
			title: 'meeting with Geoff',
			description: 'Stand up',
			start: '2024-07-24 12:30:00+0100',
			end: '2024-07-24 13:00:00+0100',
			tier: 0
		}
	]
}

const calendarEventsSlice = createSlice({
	name: 'calendarEvents',
	initialState,
	reducers: {}
})

export default calendarEventsSlice.reducer
