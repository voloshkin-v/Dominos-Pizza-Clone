import React, { useState, useEffect } from 'react';

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Loader from '../components/loader/Loader';
import Search from '../components/search/Search';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [categoryIndex, setCategoryIndex] = useState(0);
	const [sortType, setSortType] = useState({});

	useEffect(() => {
		const category =
			categoryIndex === 0 ? '' : `category=${categoryIndex}&`;

		const sort =
			Object.keys(sortType).length === 0
				? ''
				: `_sort=${sortType.slug}&_order=${sortType.orderBy}`;

		setIsLoading(true);

		fetch(`http://localhost:3001/pizzas?${category}${sort}`)
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
	}, [categoryIndex, sortType]);

	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryIndex}
					onChangeCategory={(i) => setCategoryIndex(i)}
				/>
				<Sort
					value={sortType}
					onChangeSort={(sortType) => setSortType(sortType)}
				/>
			</div>

			<Search />

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
