import { FunctionComponent } from 'react'
import { useAppDispatch } from '../app/hooks'
import { setCurrentSelection } from '../features/calendarEvents/calendarEventsSlice'

interface CalendarEventInterface extends APICalendarEvent {
	top: number
	height: number
}

const CalendarEvent: FunctionComponent<{
	calendarEvent: CalendarEventInterface
}> = ({ calendarEvent }) => {
	const dispatch = useAppDispatch()
	return (
		<div
			className="calendar-event"
			style={{
				top: `${calendarEvent.top}px`,
				height: `${calendarEvent.height}px`
			}}
			onClick={() => dispatch(setCurrentSelection(calendarEvent.id))}
		>
			<span>{calendarEvent.title}</span>
			<span>{calendarEvent.description}</span>
		</div>
	)
}

export default CalendarEvent
