import { z } from 'zod'
import { FormEvent, FunctionComponent } from 'react'
import { calendarEventsApiSlice } from './calendarEventsSlice'

const { useCreateEventMutation } = calendarEventsApiSlice

const createCalendarEventType: z.ZodType<Omit<APICalendarEvent, 'id'>> = z
	.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		start: z.string(),
		end: z.string(),
		tier: z.number()
	})
	.omit({ id: true })

const CreateCalendarEventForm: FunctionComponent = () => {
	const [createEvent, result] = useCreateEventMutation()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const body = createCalendarEventType.parse({
			...Object.fromEntries(formData),
			tier: Number(formData.get('tier'))
		})

		createEvent(body)
		e.currentTarget.reset()
	}
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">
				Title:
				<input name="title" id="title" required />
			</label>
			<label htmlFor="description">
				Description:
				<textarea name="description" id="description" required />
			</label>
			<label htmlFor="start">
				Start:
				<input type="datetime-local" name="start" id="start" required />
			</label>
			<label htmlFor="end">
				End:
				<input type="datetime-local" name="end" id="end" required />
			</label>
			<label htmlFor="tier">
				Tier:
				<select name="tier" id="tier">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
				</select>
			</label>
			<button type="submit">Submit</button>
		</form>
	)
}

export default CreateCalendarEventForm
