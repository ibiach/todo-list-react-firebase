import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { onValue } from 'firebase/database'

const useUpdateState = ref => {
	const [state, setState] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const wait = delay => new Promise(res => setTimeout(res, delay))
		const getData = data => new Promise((res, rej) => (data ? res(data) : rej(data)))

		onValue(ref, snapshot => {
			Promise.all([getData(snapshot), wait(0)])
				.then(values => {
					const data = values[0].val()

					if (!data) {
						return setState([])
					}

					data.filter(item => {
						if (dayjs().isAfter(item.time, 'day')) {
							item.complete = true
							item.time = 'Overdue'
						}

						if (item.time === 'Overdue') {
							item.complete = true
						}
					})

					data ? setState(data) : setState([])
				})
				.catch(error => console.log('Error:', error))
				.finally(() => setLoading(false))
		})
	}, [])

	return [state, loading]
}

export default useUpdateState
