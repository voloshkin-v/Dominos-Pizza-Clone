import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSort } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/productsSlice';

import { SearchContext } from '../context/SearchContext';

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Error from '../components/error/Error';
import CardSkeletons from '../components/cardSkeletons/CardSkeletons';
import NotFoundBlock from '../components/notFoundBlock/NotFoundBlock';
import Filters from '../components/filters/Filters';

const Home = () => {
	const dispatch = useDispatch();

	const sortType = useSelector((state) => state.filter.sort);
	const { categoryId } = useSelector((state) => state.filter);
	const { items } = useSelector((state) => state.productsSlice);

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const isFirstMount = useRef(true);

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const query = searchQuery ? `q=${searchQuery}` : '';
		const category = categoryId === 0 ? '' : `&category=${categoryId}`;

		const sort =
			Object.keys(sortType).length === 0
				? ''
				: `&_sort=${sortType.slug}&_order=${sortType.orderBy}`;

		setIsLoading(true);
		isFirstMount.current = false;

		fetch(`http://localhost:3001/pizzas?${query}${category}${sort}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Could not fetch`);
				}

				return response.json();
			})
			.then((data) => {
				dispatch(setItems(data));
			})
			.catch((err) => {
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [categoryId, sortType, searchQuery]);

	const renderItems = (arr) => {
		if (isError || arr.length === 0) return;

		const pizzaItems = arr.map((item) => (
			<PizzaBlock key={item.id} {...item} />
		));

		return <ul className="content__items">{pizzaItems}</ul>;
	};

	const listItems = renderItems(items);
	const error = isError ? <Error /> : null;
	const skeleton = isFirstMount.current ? (
		<CardSkeletons itemsCount={16} />
	) : null;
	const notFound =
		!isError && !isLoading && items.length === 0 ? <NotFoundBlock /> : null;

	return (
		<SearchContext.Provider
			value={{ searchQuery, setSearchQuery, isLoading }}
		>
			<div className="content__top">
				<Categories
					isLoading={isLoading}
					value={categoryId}
					onChangeCategory={(id) => dispatch(setCategoryId(id))}
				/>
				<Sort
					isLoading={isLoading}
					value={sortType}
					onChangeSort={(sortType) => dispatch(setSort(sortType))}
				/>
			</div>

			<Filters />

			<h2 className="content__title">All the Pizzas</h2>

			{listItems}
			{skeleton}
			{error}
			{notFound}
		</SearchContext.Provider>
	);
};

export default Home;
