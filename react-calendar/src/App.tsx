import './App.css'
import Day from './components/Day'
import { isToday, setDay } from 'date-fns'

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

	return (
		<main>
			<div>
				<div className="hour cell"></div>
				{hours.map((h, i) => {
					h = i < 10 ? `0${i}:00` : `${i}:00`
					return <div className="hour cell">{h}</div>
				})}
			</div>
			{days.map((day) => (
				<Day day={day} isToday={isToday(day)} />
			))}
		</main>
	)
}

export default App
