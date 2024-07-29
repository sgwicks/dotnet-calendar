import './App.css'
import Day from './components/Day'
import CreateCalendarEventForm from './features/calendarEvents/CreateCalendarEventForm'
import UpdateCalendarEventForm from './features/calendarEvents/UpdateCalenderEventForm'
import { endOfDay, isSameDay, isToday, setDay, startOfDay } from 'date-fns'
import { calendarEventsApiSlice } from './features/calendarEvents/calendarEventsSlice'
import { useAppSelector } from './app/hooks'

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

	const { data = [] } = useFetchEventsQuery({
		start: startOfDay(days[0]).toISOString(),
		end: endOfDay(days[6]).toISOString()
	})

	const id = useAppSelector((state) => state.calendarEvents.currentSelection)

	return (
		<main>
			<section className="calendar">
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
			</section>
			<section className="create event-form-wrapper">
				<CreateCalendarEventForm />
			</section>
			<section className="edit event-form-wrapper">
				{id && <UpdateCalendarEventForm id={id} />}
			</section>
		</main>
	)
}

export default App
