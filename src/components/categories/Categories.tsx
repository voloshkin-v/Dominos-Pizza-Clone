import React, { memo } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { useSelector } from 'react-redux';
import { productsSelector } from '../../redux/products/selectors';

import './categories.scss';

type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
};

const categories = ['All', 'New', 'Best price', 'Heroes', 'Wonder', 'Finest'];

const Categories: React.FC<CategoriesProps> = memo(
	({ value, onChangeCategory }) => {
		const { status } = useSelector(productsSelector);

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
								disabled={status === 'loading'}
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
	}
);

export default Categories;
