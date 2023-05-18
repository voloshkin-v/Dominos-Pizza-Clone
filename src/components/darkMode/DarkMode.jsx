import React, { useContext } from 'react';

import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';

import { ThemeContext } from '../App';

import './darkMode.scss';

const DarkMode = ({ theme, toggleTheme }) => {
	return (
		<div className="dark-mode-trigger">
			<button
				className={theme === 'light' ? 'shadow-light' : 'shadow-dark'}
				onClick={toggleTheme}
			>
				{theme === 'light' ? (
					<img src={sun} alt="sun" />
				) : (
					<img src={moon} alt="moon" />
				)}
			</button>
		</div>
	);
};

export default DarkMode;
