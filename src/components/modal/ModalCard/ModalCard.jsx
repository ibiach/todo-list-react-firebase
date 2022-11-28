import React, { useEffect } from 'react'

const ModalCard = ({ deleteFile, currentIndex, currentDataCard, dowloadFiles, images }) => {
	const { title, description, time } = currentDataCard

	useEffect(() => {
		dowloadFiles('', currentIndex)
	}, [])

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
				{images.map((img, index) => {
					console.log(img)
					return (
						<div key={index} style={{ position: 'relative' }}>
							<span
								onClick={() => deleteFile(img.location, currentIndex)}
								className='close'
								style={{ position: 'absolute', top: '1%', right: '12%' }}
							>
								&times;
							</span>
							<img
								src={img.url}
								alt={img.name}
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

export default ModalCard
