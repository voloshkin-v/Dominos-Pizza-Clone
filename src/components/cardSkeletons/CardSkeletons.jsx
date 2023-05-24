import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './cardSkeleton.scss';

const CardSkeleton = ({ itemsCount }) => {
	const sleletonsItems = Array(itemsCount)
		.fill(0)
		.map((_, i) => (
			<li key={i} className="card-skeleton">
				<Skeleton className="card-skeleton__image" />
				<Skeleton className="card-skeleton__title" />
				<Skeleton className="card-skeleton__selector" />

				<div className="card-skeleton__bottom">
					<Skeleton className="card-skeleton__price" />
					<Skeleton className="card-skeleton__button" />
				</div>
			</li>
		));

	return <ul className="content__items">{sleletonsItems}</ul>;
};

export default CardSkeleton;
