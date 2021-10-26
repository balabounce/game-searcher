import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(5, 52, 66)'
		}, 
		secondary: {
			main: 'rgb(5, 52, 66)'
		}
	}
});

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-eff9yj44.us.auth0.com"
			clientId="ZRqrTZ6uVqPqjykH4uZlspx36L6SlL8V"
			redirectUri={window.location.origin}
			>      
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
