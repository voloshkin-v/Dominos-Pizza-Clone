import React from 'react';

import styles from './notFoundBlock.module.scss';

const NotFoundBlock = ({ children }) => {
	return (
		<div className={styles.root}>
			<h1>
				<span>😕</span>
				<br />
				Nothing was found.
			</h1>

			{children}
		</div>
	);
};

export default NotFoundBlock;
