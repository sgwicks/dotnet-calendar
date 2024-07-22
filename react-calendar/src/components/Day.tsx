import { FunctionComponent } from 'react'
import Hour from './Hour'
import {
	eachHourOfInterval,
	endOfDay,
	format,
	isSameHour,
	startOfDay
} from 'date-fns'

const Day: FunctionComponent<{
	day: Date
	isToday?: boolean
	todaysEvents: APICalendarEvent[]
}> = ({ day, isToday = false, todaysEvents = [] }) => {
	const hours = eachHourOfInterval({
		start: startOfDay(day),
		end: endOfDay(day)
	})

	return (
		<div className={`day ${isToday && 'today'}`}>
			<h2 className="cell">{format(day, 'EEE do MMM')}</h2>
			{hours.map((h, i) => {
				const hoursEvents = todaysEvents.filter((e) => isSameHour(e.start, h))
				return <Hour hour={h} key={`${day}-${i}`} hoursEvents={hoursEvents} />
			})}
		</div>
	)
}

export default Day
