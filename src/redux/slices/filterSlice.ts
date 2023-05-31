import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type SortItem = {
	name: string;
	slug: 'price' | '';
	orderBy: 'asc' | 'desc' | '';
};

interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	sort: SortItem;
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	sort: {
		name: 'Default',
		slug: '',
		orderBy: '',
	},
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSort: (state, action: PayloadAction<SortItem>) => {
			state.sort = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
	},
});

export const sortSelector = (state: RootState) => state.filter.sort;
export const filterSelector = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
