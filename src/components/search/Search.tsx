import React, { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';
import { productsSelector } from '../../redux/slices/productsSlice';

import './search.scss';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const { status } = useSelector(productsSelector);

	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClickClear = () => {
		setValue('');
		dispatch(setSearchValue(''));

		inputRef.current?.focus();
		updateSearchValue.cancel();
	};

	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]
	);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target.value;

		setValue(target);
		updateSearchValue(target);
	};

	return (
		<div
			className={`search-field ${status === 'loading' ? 'loading' : ''}`}
		>
			<input
				value={value}
				onChange={onChangeInput}
				className="search-field__input"
				placeholder="Search..."
				ref={inputRef}
			/>

			{value && (
				<button
					className="search-field__button"
					onClick={handleClickClear}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 96 960 960"
						width="24"
					>
						<path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default Search;
