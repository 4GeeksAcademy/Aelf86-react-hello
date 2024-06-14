import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [task, setTask] = useState({});
	const [todos, setTodos] = useState([]);


	const handleClick = async () => {
		if (!task.label || task.label.trim() === "") {
			return;
		}
		const response = await fetch("https://playground.4geeks.com/todo/todos/Aelf86", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				label: task.label,
				is_done: false
			})
		})
		const data = await response.json()
		console.log(data)
		setTodos([...todos, task])
		setTask({
			label: ""
		})
	}


	const handleChange = (e) => {
		setTask({ label: e.target.value, is_done: false })
	}

	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/Aelf86", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()

	}

	const getTodo = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/Aelf86")

		const data = await response.json()
		if (response.ok) {
			setTodos(data.todos)
			return true
		}

		setTodos(false)
		return false
	}

	const updateTodo = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/todos/Aelf86", {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})

		const data = await response.json()


	}

	useEffect(() => {
		createUser()
		getTodo()
	}, [])

	useEffect(() => {
		updateTodo()
	}, [todos])


	const deleteTask = async (id) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
		const data = await response.json()
		console.log(data)
		getTodo()
	}

	return (
		<div className="text-center d-grid gap-3">
			<h1 className="text-center mt-5">To-do list with React and Fetch!</h1>


			<div>
				<input type="text" value={task.label} placeholder="Add your task" onChange={handleChange} />
				<button className="btn btn-success m-2" onClick={handleClick}>Add task</button>

			</div>

			<ul>
				{todos && todos.length > 0 && todos.map((todo, index) => {
					return (
						<li className="list-group-item d-flex justify-content-between .bg-secondary" key={todo.id}>
							{todo.label}
							<button className="btn btn-dark list-inline m-1" onClick={() => deleteTask(todo.id)}>Delete 
								<i class="fa-solid fa-trash"></i>
							</button>

						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Home;
