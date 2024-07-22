type DayString =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'

interface APICalendarEvent {
	id: string
	title: string
	description: string
	start: string
	end: string
	tier: number
}
