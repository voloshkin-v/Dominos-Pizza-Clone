import React, { useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import { productsSelector } from '../../redux/slices/productsSlice';
import { SortItem } from '../../redux/slices/filterSlice';

import { useOusideClick } from '../../hooks/onOutsideClick';

import './sort.scss';

type SortProps = {
	value: SortItem;
	onChangeSort: (obj: SortItem) => void;
};

const list: SortItem[] = [
	{
		name: 'Price, low to high',
		slug: 'price',
		orderBy: 'asc',
	},
	{
		name: 'Price, high to low',
		slug: 'price',
		orderBy: 'desc',
	},
];

const Sort: React.FC<SortProps> = ({ value, onChangeSort }) => {
	const { status } = useSelector(productsSelector);
	const [open, setOpen] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);

	useOusideClick(popupRef, () => setOpen(false), open);

	const handleClickSort = (sortObj: SortItem) => {
		onChangeSort(sortObj);
		setOpen(false);
	};

	return (
		<div className="sort" ref={popupRef}>
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="currentColor"
					/>
				</svg>
				<b>Sort By:</b>
				<button
					disabled={status === 'loading'}
					onClick={() => setOpen(!open)}
				>
					{value.name}
				</button>
			</div>

			{open && (
				<div className="sort__popup">
					<ul>
						{list.map((sortItem, i) => (
							<li key={i}>
								<button
									className={
										sortItem.name === value.name
											? 'active'
											: ''
									}
									onClick={() => handleClickSort(sortItem)}
								>
									{sortItem.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
