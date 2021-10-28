import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header.component';
import SideBar from './components/SideBar/SideBar.component';
import { CircularProgress } from '@mui/material';
import GamesList from './components/GamesList/GamesList.component';

const API_KEY = '345c6ea8a03b4a83903196d5d87e51de';

function App() {
	// const [token, setToken] = useState();
	const { user, isAuthenticated, isLoading } = useAuth0();
	useEffect(() => {
		fetch(`https://api.rawg.io/api/games/3498/movies?key=${API_KEY}`)
		.then(res => res.json())
		.then(
		(result) => {
			console.log(result.results);
		},
		(error) => {
			console.log(error);
		}
		);
	}, []);

	if(isLoading) {
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
		<BrowserRouter>
		<Switch>
			<Route path='/dashboard'>
				{/* <Dashboard/> */}
			</Route>
			<Route path='/preferences'>
				{/* <Preferences/> */}
			</Route>
		</Switch>
		</BrowserRouter>
		<Header user={user} isAuthenticated={isAuthenticated}></Header>
		<SideBar/>
		<GamesList/>

	</div>
	);
}

export default App;
