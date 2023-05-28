import React, { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';

import { filterSelector, setSearchValue } from '../../redux/slices/filterSlice';

import './search.scss';

const Search = () => {
	const dispatch = useDispatch();
	const { status } = useSelector(filterSelector);

	const [value, setValue] = useState('');
	const inputRef = useRef(null);

	const handleClickClear = () => {
		setValue('');
		dispatch(setSearchValue(''));

		inputRef.current.focus();
		updateSearchValue.cancel();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]
	);

	const onChangeInput = (e) => {
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
