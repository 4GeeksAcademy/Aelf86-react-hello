import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const username = "Aelf86"
	const API_URL = "https://playground.4geeks.com/apis/fake/todos" 
	const [task, setTask] = useState({});
	const [todos, setTodos] = useState([]);


	const handleClick = () => {
		setTodos([...todos, task])
		setTask({})
	}

	const handleChange = (e) => {
		setTask({label: e.target.value, done: false})
	}

	const createUser = async () => {
		const response = await	fetch(`${API_URL}/user/${username}`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
		console.log(response)
		const data = await response.json()
		if(response.ok){
			console.log(data)
		}
		console.log(data)
	}

	const getTodo = async () => {
		const response = await	fetch(`${API_URL}/user/${username}`)
		console.log(response)
		const data = await response.json()
		if(response.ok){
			console.log(data)
			setTodos(data)
			return true
		}
		console.log(data)
		setTodos(false)
		return false
	}

	const updateTodo = async () => {
		const response = await	fetch(`${API_URL}/user/${username}`, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
		console.log(response)
		const data = await response.json()
		if(response.ok){
			console.log(data)
		}
		console.log(data)
	}

	useEffect(() => {
		createUser()
		getTodo()
	}, [])

	useEffect(() => {
		updateTodo()
	}, [todos])

	//filtro guarda todo menos el que quiero borrar
	function deleteTask (id) {
		let aux = []
		aux = todos.filter((item,index) =>{
			if (index!=id) {
				return item
			}
		})
		setTodos(aux)
	}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">To-do list with React and Fetch!</h1>


			<div>
				<input type="text" onChange={handleChange} />
				<button onClick={handleClick}>Add task</button>

			</div>
			
			<ul>
				{todos && todos.length > 0 && todos.map((todo, index) => {
					return (
						<li key={todo.id}>
							{todo.label}
							<button className="btn btn-danger" onClick={() => deleteTask(index)}>Delete</button>
						</li>
						)
					})}
			</ul>

		</div>
	);
};

export default Home;
