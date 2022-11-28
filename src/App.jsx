import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getDatabase, ref, set } from 'firebase/database'
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	listAll,
	ref as strgRef,
	uploadBytes,
} from 'firebase/storage'

import add from './assets/icons/add.svg'
import Card from './components/card/Card'
import ModalView from './components/modal/ModalView/ModalView'
import { app } from './firebase/Firebase'
import useUpdateState from './hooks/useUpdateState'

import './App.css'

const todoRef = ref(getDatabase(app), 'tasks')
const imgRef = (name, idx) => strgRef(getStorage(app), `images${idx}/${name}`)

const App = () => {
	const [open, setOpen] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [readMode, setReadMode] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(null)
	const [todos, loading] = useUpdateState(todoRef)
	const [currentDataCard, setCurrentDateCard] = useState({})
	const [images, setImages] = useState([])

	const indexAdd = todos.length

	const toggleModalWindow = () => {
		setOpen(!open)
		setImages([])
	}

	const dowloadFiles = (file, idx) => {
		listAll(imgRef(file, idx))
			.then(res =>
				res.items.forEach(item => {
					getDownloadURL(item).then(url =>
						setImages(prev => [...prev, { url: url, location: item._location.path }])
					)
				})
			)
			.catch(error => console.log(`Error: ${error}`))
	}

	const uploadFiles = (files, idx) => {
		for (const file of files) {
			const storageRef = imgRef(file.name, idx)

			uploadBytes(storageRef, file)
				.then(snapshot => {
					console.log(snapshot.ref)
					console.log('Uploaded a blob or file!')
				})
				.catch(error => console.log(`Error: ${error}`))
		}
	}

	const deleteFile = (location, index) => {
		const storageRef = strgRef(getStorage(app), location)

		console.log(storageRef)

		deleteObject(storageRef)
			.then(() => {
				setImages([])
				dowloadFiles('', index)
				console.log('File deleted successfully')
			})
			.catch(error => console.log('Uh-oh, an error occurred!', error))
	}

	const onEditMode = idx => {
		setCurrentIndex(idx)

		toggleModalWindow()

		setReadMode(false)
		setEditMode(true)
	}

	const onReadMode = idx => {
		setCurrentIndex(idx)

		toggleModalWindow()

		setCurrentDateCard(todos[idx])

		setReadMode(true)
		setEditMode(false)
	}

	const addTodo = data => {
		const todo = {
			time: data.time,
			title: data.title,
			description: data.description,
			complete: false,
			createAt: dayjs().format('YYYY:MM:DD'),
		}

		set(todoRef, [...todos, todo])
	}

	const editTodo = (data, currentIndex) => {
		const { title, description, time, images, complete } = todos[currentIndex]

		const changeItemsTodo = {
			title: data.title === '' ? title : data.title,
			description: data.description === '' ? description : data.description,
			time: data.time === '' ? time : data.time,
			complete: complete,
		}

		const editTodo = [
			...todos.slice(0, currentIndex),
			changeItemsTodo,
			...todos.slice(currentIndex + 1),
		]

		set(todoRef, editTodo)
	}

	const deleteTodo = index => () => {
		const deleteTodo = [...todos.slice(0, index), ...todos.slice(index + 1)]

		set(todoRef, deleteTodo)
	}

	const editComplete = (complete, index) => () => {
		const changeComplete = {
			...todos[index],
			complete: complete,
		}

		const editComplete = [...todos.slice(0, index), changeComplete, ...todos.slice(index + 1)]

		set(todoRef, editComplete)
	}

	return (
		<div className='main-container'>
			<div className='heading'>
				<h1>TODO LIST</h1>
			</div>

			<ModalView
				open={open}
				todos={todos}
				addTodo={addTodo}
				editTodo={editTodo}
				readMode={readMode}
				editMode={editMode}
				setEditMode={setEditMode}
				setReadMode={setReadMode}
				uploadFiles={uploadFiles}
				deleteFile={deleteFile}
				dowloadFiles={dowloadFiles}
				images={images}
				indexAdd={indexAdd}
				currentIndex={currentIndex}
				currentDataCard={currentDataCard}
				toggleModalWindow={toggleModalWindow}
			/>

			<Card
				todos={todos}
				loading={loading}
				deleteTodo={deleteTodo}
				onEditMode={onEditMode}
				onReadMode={onReadMode}
				editComplete={editComplete}
				toggleModalWindow={toggleModalWindow}
			/>

			<div style={loading ? { display: 'none' } : { display: 'flex' }}>
				<img
					src={add}
					alt='add'
					style={{ margin: 'auto', cursor: 'pointer' }}
					onClick={toggleModalWindow}
				/>
			</div>
		</div>
	)
}

export default App
