import { z } from 'zod'
import { FormEvent, FunctionComponent } from 'react'
import { calendarEventsApiSlice } from './calendarEventsSlice'

const { useCreateEventMutation } = calendarEventsApiSlice

const createCalendarEventType: z.ZodType<Omit<APICalendarEvent, 'id'>> =
	z.object({
		title: z.string(),
		description: z.string(),
		start: z.string(),
		end: z.string(),
		tier: z.number()
	})

const CreateCalendarEventForm: FunctionComponent = () => {
	const [createEvent] = useCreateEventMutation()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = Object.fromEntries(new FormData(e.currentTarget))
		const body = createCalendarEventType.parse({
			title: formData['create-form-title'],
			description: formData['create-form-description'],
			start: formData['create-form-start'],
			end: formData['create-form-end'],
			tier: Number(formData['create-form-tier'])
		})

		createEvent(body)
		e.currentTarget.reset()
	}
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="create-form-title">
				Title:
				<input name="create-form-title" id="create-form-title" required />
			</label>
			<label htmlFor="create-form-description">
				Description:
				<textarea
					name="create-form-description"
					id="create-form-description"
					required
				/>
			</label>
			<label htmlFor="create-form-start">
				Start:
				<input
					type="datetime-local"
					name="create-form-start"
					id="create-form-start"
					required
				/>
			</label>
			<label htmlFor="create-form-end">
				End:
				<input
					type="datetime-local"
					name="create-form-end"
					id="create-form-end"
					required
				/>
			</label>
			<label htmlFor="create-form-tier">
				Tier:
				<select name="create-form-tier" id="create-form-tier">
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
