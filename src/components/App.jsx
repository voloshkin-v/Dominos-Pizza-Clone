import React, { useEffect, useState } from 'react';

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import Header from './header/Header';
import DarkMode from './darkMode/DarkMode';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Cart';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route index element={<Home />} />
			<Route path="cart" element={<Cart />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

const App = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || 'light'
	);

	useEffect(() => {
		document.body.id = theme;
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
	};

	return (
		<>
			<DarkMode theme={theme} toggleTheme={toggleTheme} />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
