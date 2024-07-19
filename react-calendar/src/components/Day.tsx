import { FunctionComponent } from 'react'

const Day: FunctionComponent<{ day: DayString }> = ({ day }) => {
	return (
		<div className="day">
			<h2>{day}</h2>
		</div>
	)
}

export default Day
