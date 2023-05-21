import React, { useState } from 'react';

import Search from '../search/Search';

import './filters.scss';

const Filters = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="filters">
			<button
				onClick={() => setOpen(!open)}
				className="button button--filters"
			>
				Add. Filters
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					viewBox="0 96 960 960"
					width="16"
				>
					<path
						fill="currentColor"
						d="m561 814-43-42 168-168H160v-60h526L517 375l43-42 241 241-240 240Z"
					/>
				</svg>
			</button>

			{open && (
				<div className="filters-main">
					<Search />
				</div>
			)}
		</div>
	);
};

export default Filters;
