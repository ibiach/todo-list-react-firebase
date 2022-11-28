import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'

import 'dayjs/locale/ru'

import Form from '../../form/CardForm'

import './ModalForm.css'

const ModalForm = props => {
	const { addTodo, editTodo, editMode, uploadFiles, toggleModalWindow, indexAdd, currentIndex } =
		props

	const [pickDate, setPickDate] = useState(dayjs().$d)

	const imgRef = useRef(null)
	const formRef = useRef(null)
	const titleRef = useRef(null)
	const descriptionRef = useRef(null)

	const handleChangeDate = date => {
		setPickDate(date)
	}

	const index = editMode ? currentIndex : indexAdd

	const handleSubmit = e => {
		e.preventDefault()

		const images = Array.from(imgRef.current.files)
		const title = titleRef.current.value
		const description = descriptionRef.current.value
		const time = dayjs(pickDate).locale('ru').format('YYYY-MM-DD')

		editMode
			? editTodo({ title, description, time }, index)
			: addTodo({ title, description, time })

		uploadFiles(images, index)

		formRef.current.reset()

		toggleModalWindow()
	}

	return (
		<Form
			ref={formRef}
			imgRef={imgRef}
			titleRef={titleRef}
			descriptionRef={descriptionRef}
			pickDate={pickDate}
			handleSubmit={handleSubmit}
			handleChangeDate={handleChangeDate}
			value={editMode ? 'Изменить' : 'Добавить'}
		/>
	)
}

export default ModalForm
