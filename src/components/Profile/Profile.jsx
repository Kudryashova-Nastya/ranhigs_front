import React, {useEffect} from 'react';
// import './style.css'
import {observer} from "mobx-react";
import ProfileStore from "../../store/ProfileStore";


const Profile = observer(() => {

	useEffect(() => {
		void ProfileStore.fetchInfo()
	}, [])

	return (
		<h1 className="header">
			Добро пожаловать, {ProfileStore.userInfo?.username}
		</h1>
	)
})

export default Profile;