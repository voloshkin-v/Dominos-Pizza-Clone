import React, { useState, useEffect } from 'react';

import { SearchContext } from '../context/SearchContext';

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Loader from '../components/loader/Loader';
import Filters from '../components/filters/Filters';
import Error from '../components/error/Error';
import NotFoundBlock from '../components/notFoundBlock/NotFoundBlock';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [categoryIndex, setCategoryIndex] = useState(0);
	const [sortType, setSortType] = useState({});

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const query = searchQuery ? `q=${searchQuery}` : '';

		const category =
			categoryIndex === 0 ? '' : `&category=${categoryIndex}`;

		const sort =
			Object.keys(sortType).length === 0
				? ''
				: `&_sort=${sortType.slug}&_order=${sortType.orderBy}`;

		setIsLoading(true);

		fetch(`http://localhost:3001/pizzas?${query}${category}${sort}`)
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
			.catch((err) => {
				setIsError(true);
				setIsLoading(false);
			});
	}, [categoryIndex, sortType, searchQuery]);

	const renderItems = (arr) => {
		if (isLoading) {
			return;
		}

		const pizzaItems = arr.map((item) => (
			<PizzaBlock key={item.id} {...item} />
		));

		return <ul className="content__items">{pizzaItems}</ul>;
	};

	const listItems = renderItems(items);
	const error = isError ? <Error /> : null;
	const notFound = items.length === 0 && !isError ? <NotFoundBlock /> : null;
	const loader = isLoading ? <Loader /> : null;

	return (
		<SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
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

			<Filters />

			<h2 className="content__title">All the Pizzas</h2>

			{listItems}
			{loader}
			{error}
			{notFound}
		</SearchContext.Provider>
	);
};

export default Home;
