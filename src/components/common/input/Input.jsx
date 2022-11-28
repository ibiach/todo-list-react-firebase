import React, { forwardRef } from 'react'

import './Input.css'

const Input = forwardRef(({ name, value, className, ...otherProps }, ref) => {
	return (
		<div className={className}>
			<input ref={ref} name={name} autoComplete='off' placeholder={value} {...otherProps} />
		</div>
	)
})

export default Input
