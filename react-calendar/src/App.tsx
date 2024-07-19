import './App.css'
import Day from './components/Day'

function App() {
	return (
		<main>
			{(
				[
					'monday',
					'tuesday',
					'wednesday',
					'thursday',
					'friday',
					'saturday',
					'sunday'
				] as DayString[]
			).map((day: DayString) => (
				<Day day={day} />
			))}
		</main>
	)
}

export default App
