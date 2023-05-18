import React, { useState, useEffect } from 'react';

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Loader from '../components/loader/Loader';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3000/pizzas')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Could not fetch`);
				}

				return response.json();
			})
			.then((data) => {
				setItems(data);
				setIsLoading(false);
			})
			.catch((err) => setIsError(true));
	}, []);

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>

			<h2 className="content__title">All the Pizzas</h2>

			<ul className="content__items">
				{isLoading ? (
					<Loader />
				) : (
					items.map((item) => <PizzaBlock key={item.id} {...item} />)
				)}
			</ul>
		</>
	);
};

export default Home;
