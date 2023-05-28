import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchValue: '',
	categoryId: 0,
	sort: {},
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
	},
});

export const sortSelector = (state) => state.filter.sort;
export const filterSelector = (state) => state.filter;

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
