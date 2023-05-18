import { useState } from 'react';

import './pizzaBlock.scss';

const PizzaBlock = ({ title, price, imageUrl, sizes, types, imageAlt }) => {
	console.log(imageUrl);
	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(0);

	const typeNames = ['Thick crust', 'Thin'];

	return (
		<li className="pizza-block">
			<div className="pizza-block__image">
				<img src={imageUrl} alt={imageAlt} />
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
				<div className="pizza-block__price">From {price} $</div>
				<button className="button button--outline button--add">
					<span>Add</span>
					<i>0</i>
				</button>
			</div>
		</li>
	);
};

export default PizzaBlock;
