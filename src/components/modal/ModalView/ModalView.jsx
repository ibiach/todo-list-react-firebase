import React from 'react'

import ModalCard from '../ModalCard/ModalCard'
import ModalForm from '../ModalForm/ModalForm'

import './ModalView.css'

const ModalView = ({
	open,
	readMode,
	editMode,
	setReadMode,
	setEditMode,
	toggleModalWindow,
	...otherProps
}) => {
	const closeModalWindow = () => {
		if (editMode) {
			toggleModalWindow()
			setEditMode()
		}

		if (readMode) {
			toggleModalWindow()
			setReadMode()
		}

		toggleModalWindow()
	}

	return (
		<div>
			<div className='modal' style={open ? { display: 'block' } : { display: 'none' }}>
				<div className='modal-content'>
					<span onClick={closeModalWindow} className='close'>
						&times;
					</span>
					{readMode ? (
						<ModalCard {...otherProps} />
					) : (
						<ModalForm
							editMode={editMode}
							toggleModalWindow={toggleModalWindow}
							{...otherProps}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default ModalView
