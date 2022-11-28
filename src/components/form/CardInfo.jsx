import React from 'react'

const CardInfo = ({ deleteFile, currentIndex, currentDataCard, todos, dowloadFiles }) => {
	const { title, description, time } = currentDataCard

	return (
		<div>
			<h1>{title}</h1>
			<p>{description}</p>

			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					flexWrap: 'wrap',
				}}
			>
				{images.map((value, i) => {
					return (
						<div key={i} style={{ position: 'relative' }}>
							<span
								onClick={() => deleteFile(link.name, editIndex)}
								className='close'
								style={{ position: 'absolute', top: '1%', right: '12%' }}
							>
								&times;
							</span>
							<img
								src={value.url}
								alt={value.name}
								style={{
									width: '100px',
									height: '100px',
									marginBottom: '10px',
									marginRight: '10px',
								}}
							/>
						</div>
					)
				})}
			</div>
			<p>{time}</p>
		</div>
	)
}

export default CardInfo
