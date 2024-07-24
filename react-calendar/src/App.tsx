import './App.css'
import Day from './components/Day'
import { isSameDay, isToday, setDay, format } from 'date-fns'
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
			<section className="calendar-grid">
				<div className="cell" style={{ gridArea: '0-0' }}></div>
				{hours.map((h, i) => {
					h = i < 10 ? `0${i}:00` : `${i}:00`
					return (
						<div className="cell" style={{ gridArea: `0-${i}` }} key={`0-${i}`}>
							{h}
						</div>
					)
				})}

				{days.map((day) => {
					const dayName = format(day, 'eee').toLowerCase()

					return (
						<>
							<div
								className="cell"
								style={{ gridArea: `${dayName}-h` }}
								key={`${dayName}-h`}
							>
								{format(day, 'eee do MMM')}
							</div>
							{hours.map((h, i) => (
								<div
									className="cell"
									style={{ gridArea: `${dayName}-${i}` }}
									key={`${dayName}-${i}`}
								></div>
							))}
						</>
					)
				})}
			</section>
		</main>
	)
}

export default App
