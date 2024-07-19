import { format } from 'date-fns'
import { FunctionComponent } from 'react'

const Hour: FunctionComponent<{ hour: Date }> = ({ hour }) => {
	return <div className="hour cell">{format(hour, 'EEE do MMM HH:mm')}</div>
}

export default Hour
