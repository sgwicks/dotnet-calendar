import './App.css'
import Day from './components/Day'
import { endOfDay, isSameDay, isToday, setDay, startOfDay } from 'date-fns'
import { calendarEventsApiSlice } from './features/calendarEvents/calendarEventsSlice'

const { useFetchEventsQuery } = calendarEventsApiSlice

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

	const {
		data = [],
		isFetching,
		refetch
	} = useFetchEventsQuery({
		start: startOfDay(days[0]).toISOString(),
		end: endOfDay(days[6]).toISOString()
	})

	return (
		<main>
			<div>
				<div className="hour cell"></div>
				{hours.map((h, i) => {
					h = i < 10 ? `0${i}:00` : `${i}:00`
					return (
						<div className="hour cell" key={h}>
							{h}
						</div>
					)
				})}
			</div>
			{days.map((day) => {
				const todaysEvents: APICalendarEvent[] = data.filter((e) => {
					return isSameDay(e.start, day)
				})
				return (
					<Day
						day={day}
						isToday={isToday(day)}
						todaysEvents={todaysEvents}
						key={day.getDate()}
					/>
				)
			})}
		</main>
	)
}

export default App
