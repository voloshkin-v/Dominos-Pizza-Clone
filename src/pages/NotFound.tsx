import React from 'react';

import { NotFoundBlock } from '../components';

const NotFound: React.FC = () => {
	return (
		<>
			<NotFoundBlock>
				<p>This page doesn't exist.</p>
			</NotFoundBlock>
		</>
	);
};

export default NotFound;
