import React, {useState} from "react"
import './style.css'
import Auth from "../../store/helper/Auth"
import {useNavigate} from "react-router-dom"
import {observer} from "mobx-react"

const Login = observer(() => {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const history = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			"username": login,
			"password": password
		}
		// log вернет ошибку, если пусто, значит ошибки нет
		const log = await Auth.login(data)
		if (log) {
			// setAuthErrors(await Auth.login(data))
			setError(log)
			console.log("ошибка", log)
		} else {
			setError(false)
			history("/user")
		}
	}

	return (
		<div className="window-container">
			<div className="window">
				<h1 className="header">Авторизация</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="login">Логин</label>
						<input id="login" className="input" name="login" type="text" value={login} required
							   onChange={(e) => setLogin(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="password">Пароль</label>
						<input className="input" id="password" name="password" type="password" value={password} required
							   onChange={(e) => setPassword(e.target.value)}/>
					</div>
					<button className="button">Войти</button>
				</form>
			</div>
			{error &&
				<div className="error-message">
					<div>{error}</div>
				</div>
			}
		</div>
	)
})

export default Login