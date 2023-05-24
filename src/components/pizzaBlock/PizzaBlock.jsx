import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addItem } from '../../redux/slices/cartSlice';

import './pizzaBlock.scss';

const typeNames = ['Thick crust', 'Thin'];

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types, imageAlt }) => {
	const dispatch = useDispatch();

	const reletedItems = useSelector((state) => state.cart.items).filter(
		(obj) => obj.id === id
	);

	const itemCount = reletedItems.reduce((total, current) => {
		return total + current.count;
	}, 0);

	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(0);

	const onClickAdd = () => {
		const item = {
			id,
			title,
			imageUrl,
			imageAlt,
			price: price[activeSize],
			type: typeNames[activeType],
			size: sizes[activeSize],
		};

		dispatch(addItem(item));
	};

	return (
		<li className="pizza-block">
			<div className="pizza-block__image">
				{imageUrl && <img src={imageUrl} alt={imageAlt} />}
			</div>

			<h3 className="pizza-block__title">{title}</h3>
			<div className="pizza-block__selector">
				<ul>
					{types.map((typeIndex) => (
						<li key={typeIndex}>
							<button
								className={
									activeType === typeIndex ? 'active' : ''
								}
								onClick={() => setActiveType(typeIndex)}
							>
								{typeNames[typeIndex]}
							</button>
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, i) => (
						<li key={i}>
							<button
								onClick={() => setActiveSize(i)}
								className={activeSize === i ? 'active' : ''}
							>
								{size} cm.
							</button>
						</li>
					))}
				</ul>
			</div>

			<div className="pizza-block__bottom">
				<div className="pizza-block__price">
					Price: {price[activeSize]} $
				</div>
				<button
					className="button button--outline button--add"
					onClick={onClickAdd}
				>
					<span>Add</span>
					<i>{itemCount}</i>
				</button>
			</div>
		</li>
	);
};

export default PizzaBlock;
