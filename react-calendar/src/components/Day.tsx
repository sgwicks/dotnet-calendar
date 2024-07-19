import { FunctionComponent } from 'react'
import Hour from './Hour'
import { eachHourOfInterval, endOfDay, format, startOfDay } from 'date-fns'

const Day: FunctionComponent<{ day: Date; isToday?: boolean }> = ({
	day,
	isToday = false
}) => {
	const hours = eachHourOfInterval({
		start: startOfDay(day),
		end: endOfDay(day)
	})

	return (
		<div className={`day ${isToday && 'today'}`}>
			<h2 className="cell">{format(day, 'EEE do MMM')}</h2>
			{hours.map((h, i) => (
				<Hour hour={h} key={`${day}-${i}`} />
			))}
		</div>
	)
}

export default Day
