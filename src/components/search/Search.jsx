import React, { useContext, useRef, useCallback, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../context/SearchContext';

import './search.scss';

const Search = () => {
	const [value, setValue] = useState('');
	const { setSearchQuery } = useContext(SearchContext);
	const inputRef = useRef(null);

	useEffect(() => {
		return () => {
			setSearchQuery('');
		}
	}, []);

	const handleClickClear = () => {
		setValue('');
		setSearchQuery('');

		inputRef.current.focus();
	};

	const updateSearchContext = useCallback(
		debounce((str) => {
			setSearchQuery(str);
		}, 500),
		[]
	);

	const onChangeInput = (e) => {
		const target = e.target.value;

		setValue(target);
		updateSearchContext(target);
	};

	return (
		<div className="search-field">
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
