import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, CORS, POSTCORS} from "./Helper";

const host = getHostInformation()

class Auth {
	constructor() {
		makeAutoObservable(this)
	}

	// вид токена {
	//  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc5MzA1MzEsImlhdCI6MTY1NzkyODczMSwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiJ1c2VyIn0.EqQXxk0DKon1xisVXOmqr69Xte6UkgoI1n2xCEM1MZw",
	//  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTgwMTUxMzEsImlhdCI6MTY1NzkyODczMSwic2NvcGUiOiJyZWZyZXNoX3Rva2VuIiwic3ViIjoidXNlciJ9.Db62JMi1qnY48NLgD_VIN84Awf25hh0My-KcKCl3QoE",
	//}
	token = JSON.parse(localStorage.getItem("TOKEN_AUTH")) || null
	profileInfo = {}
	role = localStorage.getItem("ROLE") || null

	login = async (data) => {

		if (!data) {
			return null
		}
		const LOGIN_CORS = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			},
		}

		const req = await fetch(`${host}/api/token/`, LOGIN_CORS)
		const res = await req.json()
		// console.log('req', req)
		if (req?.ok && req?.status === 200) {
			// console.log("200")
			this.setToken(res)

			return false // возвращает false в случае успешной авторизации
		} else {
			// console.log("не 200")
			return res.detail || JSON.stringify(res) // возвращает текст ошибки в случае ошибки авторизации
		}
	}

	logout = () => {
		this.setToken(null)
	}

	// узнать дату окончания жизни токена
	getExpirationDate = (jwtToken = null) => {
		if (jwtToken === null) {
			return null
		}

		const jwt = JSON.parse(atob(jwtToken.split(".")[1]))
		return jwt.exp * 1000 || null
	}

	// узнать просрочен ли токен
	isExpired = (exp) => {
		return Date.now() >= exp
	}

	// получить актуальный набор токенов
	getToken = async () => {
		if (!this.token) {
			return null
		}
		// проверка не протух ли аксес-токен
		if (this.isExpired(this.getExpirationDate(this.token.access))) {
			const req = await fetch(`${host}/api/token/refresh/`, POSTCORS({"refresh": this.token?.refresh}))
			const res = await req.json()
			// console.log("попытка рефреша ответ", res)
			if (res?.access) {
				// console.log("новый токен получен после рефреш")
				this.setToken(res)
			} else {
				// console.log("токен удалён, рефреш не удался")
				this.setToken(null)
			}
		}
		return this.token
	}

	setToken = (token) => {
		if (token) {
			// console.log("кладём в локальное хранилище")
			localStorage.setItem("TOKEN_AUTH", JSON.stringify(token))
		} else {
			localStorage.removeItem("TOKEN_AUTH")
			this.profileInfo = null
			this.role = null
			localStorage.removeItem("ROLE")
		}
		runInAction(() => {
			this.token = token
		})
		// console.log("обновление/удаление токена", this.token)
	}

	// getRole = async () => {
	// 	if (!this.role) {
	// 		const usersInfoReq = await fetch(`${host}/api/v1/profile`, CORS(this.token?.access))
	// 		const usersInfoRes = await usersInfoReq.json()
	// 		if (usersInfoReq.ok && usersInfoReq?.status === 200) {
	// 			runInAction(() => {
	// 				// console.log("запрос на роль")
	// 				this.profileInfo = usersInfoRes
	// 				this.role = usersInfoRes?.user_role
	// 				localStorage.setItem("ROLE", usersInfoRes?.user_role)
	// 			})
	// 		} else {
	// 			console.log("ошибка получения данных профиля")
	// 		}
	// 	}
	// 	// console.log("профиль существует", JSON.stringify(this.profileInfo))
	// 	// console.log("и вот его роль", this.profileInfo.user_role)
	// 	return this.role
	// }

	// getProfileInfo = async () => {
	// 	const usersInfoReq = await fetch(`${host}/api/v1/profile`, CORS(this.token?.access))
	// 	const usersInfoRes = await usersInfoReq.json()
	// 	if (usersInfoReq.ok && usersInfoReq?.status === 200) {
	// 		runInAction(() => {
	// 			// console.log("запрос на инфу о профиле")
	// 			this.profileInfo = usersInfoRes
	// 			this.role = usersInfoRes?.user_role
	// 			localStorage.setItem("ROLE", usersInfoRes?.user_role)
	// 		})
	// 	} else {
	// 		if (usersInfoRes.code === "token_not_valid") {
	// 			void this.getProfileInfo()
	// 		} else {
	// 			console.log("ошибка получения данных профиля")
	// 		}
	// 	}
	// }
}
export default new Auth()
