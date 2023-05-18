import React from 'react';

import styles from './notFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<div className={styles.root}>
			<h1>
				<span>😕</span>
				<br />
				Nothing was found.
			</h1>

			<p>This page doesn't exist.</p>
		</div>
	);
};

export default NotFoundBlock;
