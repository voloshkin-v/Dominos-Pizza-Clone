import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';

import './darkMode.scss';

type DarkModeProps = {
	theme: string;
	toggleTheme: () => void;
};

const DarkMode: React.FC<DarkModeProps> = ({ theme, toggleTheme }) => {
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
