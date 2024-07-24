import { FunctionComponent } from 'react'

interface CalendarEventInterface extends APICalendarEvent {
	top: number
	height: number
}

const CalendarEvent: FunctionComponent<{
	calendarEvent: CalendarEventInterface
}> = ({ calendarEvent }) => {
	return (
		<div
			className="calendar-event"
			style={{
				top: `${calendarEvent.top}px`,
				height: `${calendarEvent.height}px`
			}}
		>
			<span>{calendarEvent.title}</span>
			<span>{calendarEvent.description}</span>
		</div>
	)
}

export default CalendarEvent
