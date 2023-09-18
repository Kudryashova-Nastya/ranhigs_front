import React from 'react';
import './style.css';
import {Link, Outlet} from "react-router-dom";
import {observer} from "mobx-react";
import Auth from "../../store/helper/Auth";


const Menu = observer(() => {
	return (
		<>
			<nav className="menu">
				<ul>
					<li><Link to="">Мой профиль</Link></li>
					<li><Link to="teams">Команды</Link></li>
					<li onClick={() => Auth.logout()}>Выход</li>
				</ul>
			</nav>
			<div className="container">
				<Outlet/>
			</div>
		</>
	)
})

export default Menu;