export const getHostInformation = () => process.env.REACT_APP_IP

export const POSTCORS = (data, token = '') => {
	return ({
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Authorization": `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})
}

export const CORS = (token) => {
	return ({
		method: 'GET',
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
};

export const PATCHCORS = (data, token = '') => {
	return ({
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			"Authorization": `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})
}

