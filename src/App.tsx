import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header.component';

const API_KEY = '345c6ea8a03b4a83903196d5d87e51de';

interface IGames {
	results: JSON
}
function App(): JSX.Element {
	// const [token, setToken] = useState();
	const { user, isAuthenticated, isLoading } = useAuth0();
	useEffect(() => {
		fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
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

	return (
	<div className='container'>
		<BrowserRouter>
		<Switch>
			<Route path='/dashboard'>
				<Dashboard/>
			</Route>
			<Route path='/preferences'>
				<Preferences/>
			</Route>
		</Switch>
		</BrowserRouter>
		<Header user={user} isAuthenticated={isAuthenticated}></Header>
	</div>
	);
}

export default App;
