import React, { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'

import Button from '../common/button/Button'
import Input from '../common/input/Input'

import 'react-datepicker/dist/react-datepicker.css'
import './CardForm.css'

const Form = forwardRef(
	(
		{ handleSubmit, titleRef, descriptionRef, handleChangeDate, imgRef, value, pickDate },
		ref
	) => {
		return (
			<form ref={ref} onSubmit={handleSubmit} className='ui-form'>
				<Input className='form-row' ref={titleRef} name='title' value={'Title'} />
				<Input
					className='form-row'
					ref={descriptionRef}
					name='description'
					value={'Description'}
				/>
				<div className='form-row'>
					<ReactDatePicker
						name='date'
						showTimeSelect
						selected={pickDate}
						onChange={date => handleChangeDate(date)}
						placeholderText={dayjs().format('YYYY-MM-DD')}
					/>
				</div>
				<Input className='form-row' ref={imgRef} multiple type='file' name={'images'} />
				<Button className='btn' type='submit'>
					{value}
				</Button>
			</form>
		)
	}
)

export default Form
