import React from 'react';

import styles from './notFoundBlock.module.scss';

type NotFoundBlockProps = {
	children?: JSX.Element;
};

const NotFoundBlock: React.FC<NotFoundBlockProps> = ({ children }) => {
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
