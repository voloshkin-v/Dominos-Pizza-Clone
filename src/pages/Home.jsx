import React, { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
	setCategoryId,
	setSort,
	sortSelector,
	filterSelector,
} from '../redux/slices/filterSlice';

import { fetchData, productsSelector } from '../redux/slices/productsSlice';

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Error from '../components/error/Error';
import CardSkeletons from '../components/cardSkeletons/CardSkeletons';
import NotFoundBlock from '../components/notFoundBlock/NotFoundBlock';
import Filters from '../components/filters/Filters';

const Home = () => {
	const dispatch = useDispatch();

	const sortType = useSelector(sortSelector);
	const { categoryId } = useSelector(filterSelector);
	const { items, status } = useSelector(productsSelector);
	const { searchValue } = useSelector(filterSelector);

	const isFirstMount = useRef(true);

	useEffect(() => {
		const query = searchValue ? `q=${searchValue}` : '';
		const category = categoryId === 0 ? '' : `&category=${categoryId}`;
		const sort =
			Object.keys(sortType).length === 0
				? ''
				: `&_sort=${sortType.slug}&_order=${sortType.orderBy}`;

		isFirstMount.current = false;

		dispatch(
			fetchData({
				query,
				category,
				sort,
			})
		);
	}, [categoryId, sortType, searchValue]);

	const renderItems = () => {
		if (status === 'error' || items.length === 0) return;

		const pizzaItems = items.map((item) => (
			<PizzaBlock key={item.id} {...item} />
		));

		return <ul className="content__items">{pizzaItems}</ul>;
	};

	const listItems = renderItems();
	const error = status === 'error' ? <Error /> : null;

	const skeleton = isFirstMount.current ? (
		<CardSkeletons itemsCount={16} />
	) : null;

	const notFound =
		status === 'success' && items.length === 0 ? <NotFoundBlock /> : null;

	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(id) => dispatch(setCategoryId(id))}
				/>
				<Sort
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
		</>
	);
};

export default Home;
