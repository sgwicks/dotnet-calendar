import { FormEvent, FunctionComponent, useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import {
	calendarEventsApiSlice,
	setCurrentSelection
} from './calendarEventsSlice'
import { format, formatISO } from 'date-fns'
import { z } from 'zod'

const { useFetchEventByIdQuery, useUpdateEventMutation } =
	calendarEventsApiSlice

const editCalendarEventType: z.ZodType<APICalendarEvent> = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	start: z.string(),
	end: z.string(),
	tier: z.number()
})

const UpdateCalenderEventForm: FunctionComponent<{ id: string }> = ({ id }) => {
	const currentEvent = useFetchEventByIdQuery(id)

	const [updateEvent] = useUpdateEventMutation()

	const dispatch = useAppDispatch()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [start, setStart] = useState('')
	const [end, setEnd] = useState('')
	const [tier, setTier] = useState(0)

	useEffect(() => {
		setTitle(currentEvent.data?.title || '')
		setDescription(currentEvent.data?.description || '')
		setStart(formatDate(currentEvent.data?.start) || '')
		setEnd(formatDate(currentEvent.data?.end) || '')
		setTier(currentEvent.data?.tier || 0)
	}, [currentEvent])

	const formatDate = (date?: string) => {
		if (!date) return ''
		return format(date, 'yyyy-MM-dd HH:mm')
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const body = editCalendarEventType.parse({
			id,
			title,
			description,
			start: formatISO(start),
			end: formatISO(end),
			tier
		})

		await updateEvent(body)
		dispatch(setCurrentSelection(null))
	}

	return (
		currentEvent.data && (
			<form onSubmit={handleSubmit}>
				<label htmlFor="edit-form-title">
					Title:
					<input
						id="edit-form-title"
						name="edit-form-title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				<label htmlFor="edit-form-description">
					Description:
					<textarea
						name="edit-form-description"
						id="edit-form-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>
				<label htmlFor="edit-form-start">
					Start:
					<input
						type="datetime-local"
						name="edit-form-start"
						id="edit-form-start"
						value={start}
						onChange={(e) => setStart(e.target.value)}
						required
					/>
				</label>
				<label htmlFor="edit-form-end">
					End:
					<input
						type="datetime-local"
						name="edit-form-end"
						id="edit-form-end"
						value={end}
						onChange={(e) => setEnd(e.target.value)}
						required
					/>
				</label>
				<label htmlFor="edit-form-tier">
					Tier:
					<select
						name="edit-form-tier"
						id="edit-form-tier"
						value={tier}
						onChange={(e) => setTier(Number(e.target.value))}
					>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>
				</label>
				<button type="submit">Submit</button>
			</form>
		)
	)
}

export default UpdateCalenderEventForm
