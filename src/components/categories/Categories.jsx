import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import './categories.scss';

const categories = ['All', 'New', 'Best price', 'Heroes', 'Wonder', 'Finest'];

const Categories = ({ value, onChangeCategory }) => {
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
							className={value === i ? 'active' : ''}
							onClick={() => onChangeCategory(i)}
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
