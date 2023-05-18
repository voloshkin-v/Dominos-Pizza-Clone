import React, { useState } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import './categories.scss';

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const categories = [
		'All',
		'New',
		'Best price',
		'Heroes',
		'Wonder',
		'Finest',
	];

	return (
		<div className="categories">
			<Splide
				options={{
					arrows: false,
					autoWidth: true,
					pagination: false,
					gap: 10,
				}}
			>
				{categories.map((categoryName, i) => (
					<SplideSlide key={i}>
						<button
							className={activeIndex === i ? 'active' : ''}
							onClick={() => setActiveIndex(i)}
						>
							{categoryName}
						</button>
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default Categories;
