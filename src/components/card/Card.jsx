import React from 'react'

import edit from '../../assets/icons/edit.svg'
import remove from '../../assets/icons/remove.svg'
import Spinner from '../common/spinner/Spinner'

import './Card.css'

const Card = ({ todos, deleteTodo, onEditMode, onReadMode, editComplete, loading }) => {
	const editCard = idx => () => onEditMode(idx)
	const readCard = idx => () => onReadMode(idx)

	return (
		<div>
			{loading ? (
				<Spinner />
			) : (
				<ul className='cards'>
					{todos.map((item, idx) => {
						const { title, description, time, complete } = item

						return (
							<div key={idx}>
								<li className={complete ? 'card-complete' : 'card'}>
									{complete && <h1 className='card__complete'>COMPLETE</h1>}

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<h2 className='card__title'>{title}</h2>
										<div className='card__imgs'>
											<img
												className='card__img'
												src={edit}
												alt='edit'
												onClick={editCard(idx)}
											/>

											<img
												className='card__img'
												src={remove}
												alt='remove'
												onClick={deleteTodo(idx)}
											/>
										</div>
									</div>

									<div className='card__description'>{description}</div>

									<div className='time_complete'>
										<p className='card__time'>{time}</p>
										<p className='card__controllers'>
											<a className='card__link'>
												<span onClick={readCard(idx)}>Open</span>
												<i className='fas fa-arrow-right'></i>
											</a>
											<a className='card__link'>
												<span onClick={editComplete(!complete, idx)}>
													Complete
												</span>
												<i className='fas fa-arrow-right'></i>
											</a>
										</p>
									</div>
								</li>
							</div>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default Card
