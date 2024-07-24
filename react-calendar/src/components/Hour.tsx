import { FunctionComponent } from 'react'
import CalendarEvent from './CalendarEvent'
import { differenceInMinutes } from 'date-fns'

const Hour: FunctionComponent<{
	hour: Date
	hoursEvents: APICalendarEvent[]
}> = ({ hour, hoursEvents = [] }) => {
	const mappedEvent = hoursEvents.map((e) => {
		const top = differenceInMinutes(e.start, hour) * (45 / 60)
		const height = differenceInMinutes(e.end, hour) * (45 / 60) - top
		return { top, height, ...e }
	})[0]

	return (
		<div className="hour cell">
			{hoursEvents.map(() => (
				<CalendarEvent calendarEvent={mappedEvent} key={mappedEvent.id} />
			))}
		</div>
	)
}

export default Hour
