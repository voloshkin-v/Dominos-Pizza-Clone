import React, { useContext } from 'react';

import { SearchContext } from '../../context/SearchContext';

import './search.scss';

const Search = () => {
	const search = useContext(SearchContext);

	return (
		<div className="search-field">
			<input
				value={search.searchQuery}
				onChange={(e) => search.setSearchQuery(e.target.value)}
				className="search-field__input"
				placeholder="Search..."
			/>

			<button
				className="search-field__button"
				onClick={() => search.setSearchQuery('')}
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
		</div>
	);
};

export default Search;
