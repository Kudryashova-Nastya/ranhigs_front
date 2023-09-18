import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, CORS} from "./helper/Helper";
import Auth from "./helper/Auth";

const host = getHostInformation()

class ProfileStore {
	constructor() {
		makeAutoObservable(this)
	}

	userInfo = {}
	fetchInfo = async () => {
		const token = await Auth.getToken()
		let req = await fetch(`${host}/api/v1/profile`, CORS(token?.access));

		const res = await req.json();
		console.log("ответ профиля", res);
		if (req.ok) {
			runInAction(() => {
				this.userInfo = res
			})
		} else {
			if (res.code === "token_not_valid") {
				Auth.getToken().then((token) => {
					if (token?.access) {
						this.fetchInfo()
					}
				})
			} else {
				console.log("error", JSON.stringify(res))
			}
		}
	}
}

export default new ProfileStore()
