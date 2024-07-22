import './App.css'
import Day from './components/Day'
import { isSameDay, isToday, setDay } from 'date-fns'

function App() {
	const hours = Array(24).fill(0)

	const today = new Date()
	const days = [
		setDay(today, 1),
		setDay(today, 2),
		setDay(today, 3),
		setDay(today, 4),
		setDay(today, 5),
		setDay(today, 6),
		setDay(today, 7)
	]

	const events: APICalendarEvent[] = [
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

	return (
		<main>
			<div>
				<div className="hour cell"></div>
				{hours.map((h, i) => {
					h = i < 10 ? `0${i}:00` : `${i}:00`
					return <div className="hour cell">{h}</div>
				})}
			</div>
			{days.map((day) => {
				const todaysEvents: APICalendarEvent[] = events.filter((e) =>
					isSameDay(e.start, day)
				)
				return (
					<Day day={day} isToday={isToday(day)} todaysEvents={todaysEvents} />
				)
			})}
		</main>
	)
}

export default App
