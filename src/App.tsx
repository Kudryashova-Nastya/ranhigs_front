import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {observer} from "mobx-react"
import {useEffect} from "react"
import Auth from "./store/helper/Auth"
import Menu from "./components/Menu/Menu"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Teams from "./components/Teams/Teams"

const App = observer(() => {
	let token = Auth.token
	let role = Auth.role

	const getToken = async () => {
		token = await Auth.getToken()
	}

	const getRole = async () => {
		// role = await Auth.getRole()
	}

	useEffect(() => {
		// проверяем наличие токенов и роль пользователя
		getToken().then((token) => {
			// if (token?.access) {
			// 	void getRole()
			// } else {
			// 	role = null
			// }
		})
		// console.log('token', token, Auth.token)
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login/>}/>
				<Route path="/user" element={(token) ? <Menu/> : <Login/>}>
					<Route path="" element={<Profile/>}/>
					<Route path="teams" element={<Teams/>}/>
				</Route>
				<Route path="/" element={<Navigate to="/login" replace/>}/>
			</Routes>
		</BrowserRouter>
	)
})

export default App
