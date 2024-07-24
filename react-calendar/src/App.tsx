import './App.css'
import Day from './components/Day'
import { isSameDay, isToday, setDay } from 'date-fns'
import { useAppSelector } from './app/hooks'

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

	const events: APICalendarEvent[] = useAppSelector(
		(state) => state.calendarEvents.calendarEvents
	)

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
