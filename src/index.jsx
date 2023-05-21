import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import App from './components/App';

import './assets/scss/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
