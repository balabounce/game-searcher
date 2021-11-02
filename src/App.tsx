import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header.component';
import SideBar from './components/SideBar/SideBar.component';
import { CircularProgress } from '@mui/material';
import GamesList from './components/GamesList/GamesList.component';
import getAllGames from './api/allGames';
import getLastGames from './api/last30days';
import getWeekGame from './api/thisWeekGames';
import getNextWeekGames from './api/nextWeekGames';
import getGoty from './api/goty';
import getPopularGames from './api/popularGames';
import getTopGames from './api/allTopGames';

export const API_KEY = 'c542e67aec3a4340908f9de9e86038af';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	if((!localStorage.getItem('user') || localStorage.getItem('user') !== undefined) &&  isAuthenticated) {
		localStorage.setItem('user', JSON.stringify(user));
	}		

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
					<GamesList titleGamesList='All Games' getGames={getAllGames} />
				</Route>
				<Route exact path='/discover/last-30-days'>
					<GamesList titleGamesList='Last 30 Days' getGames={getLastGames}/>
				</Route>
				<Route exact path='/discover/this-week'>
					<GamesList titleGamesList='This Week' getGames={getWeekGame}/>
				</Route>
				<Route exact path='/discover/next-week'>
					<GamesList titleGamesList='Next Week' getGames={getNextWeekGames}/>
				</Route>
				<Route exact path='/discover/best-of-the-year'>
					<GamesList titleGamesList='Best Of The Year' getGames={getGoty}/>
				</Route>
				<Route exact path='/discover/popular-in-2020'>
					<GamesList titleGamesList='Popular in 2020' getGames={getPopularGames}/>
				</Route>
				<Route exact path='/discover/popular-in-2020'>
					<GamesList titleGamesList='Popular in 2020' getGames={getPopularGames}/>
				</Route>
				<Route exact path='/discover/all-time-top-250'>
					<GamesList titleGamesList='Top 250' getGames={getTopGames}/>
				</Route>
		</BrowserRouter>
	</div>
	);
}

export default App;
