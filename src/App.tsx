import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header.component';
import SideBar from './components/SideBar/SideBar.component';
import { CircularProgress } from '@mui/material';
import GamesList from './components/GamesList/GamesList.component';
import getAllGames from './api/allGames';

export const API_KEY = '345c6ea8a03b4a83903196d5d87e51de';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	console.log(isAuthenticated);
	if((!localStorage.getItem('user') || localStorage.getItem('user') !== undefined) &&  isAuthenticated) {
		localStorage.setItem('user', JSON.stringify(user));
	}		

	// useEffect(() => {
	// 	fetch(`https://api.rawg.io/api/games?page=1&key=${API_KEY}`)
	// 	.then(res => res.json())
	// 	.then(
	// 	(result) => {
	// 		console.log(result.results);
	// 	},
	// 	(error) => {
	// 		console.log(error);
	// 	}
	// 	);
	// }, []);

	if(isLoading && localStorage.getItem('user')) {
		return (
		<div className="container">
			<Header/>
			<SideBar/>
			<CircularProgress size={70} color="secondary" sx={{
				position: 'absolute',
				margin: '0 auto',
				top: '50%',
				left: '50%',
				marginLeft: '-0.625em',
				transform: 'translateX(-50%)'
			}} />
		</div>
		);
	} else if(isLoading) {
		return <CircularProgress size={70} color="secondary" sx={{
			position: 'absolute',
			margin: '0 auto',
			top: '50%',
			left: '50%',
			marginLeft: '-0.625em',
			transform: 'translateX(-50%)'
		}} />;
	}	


	return (
	<div className='container'>
		<Header/>
		<SideBar/>
		<BrowserRouter>
				<Route exact path='/'>
					<GamesList titleGamesList='All Games' getAllGames={getAllGames}/>
				</Route>
				<Route exact path='/discover/last-30-days'>
					<GamesList titleGamesList='Last 30 Days'/>
				</Route>
		</BrowserRouter>
	

	</div>
	);
}

export default App;
