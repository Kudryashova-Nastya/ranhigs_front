import React, {useEffect} from 'react';
// import './style.css';
import {observer} from "mobx-react";
import TeamsStore from "../../store/TeamsStore";


const Teams = observer(() => {
	useEffect(() => {
		void TeamsStore.fetchTeams()
	}, [])

	return (
		<>
			<h1 className="header">
				Команды
			</h1>
			<ul>
				{TeamsStore.teamsInfo.map((el) => <li key={el.id}>{el.name} {el.pincode}</li>)}
			</ul>
		</>
	)
})

export default Teams;