import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
	'products/fetchDataStatus',
	async (params) => {
		const { query, category, sort } = params;

		const response = await fetch(
			`http://localhost:3001/pizzas?${query}${category}${sort}`
		);

		const data = await response.json();

		return data;
	}
);

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchData.pending]: (state) => {
			state.status = 'loading';
			state.items = [];
		},
		[fetchData.fulfilled]: (state, action) => {
			state.status = 'success';
			state.items = action.payload;
		},
		[fetchData.rejected]: (state, action) => {
			state.status = 'error';
			state.items = [];
		},
	},
});

export const productsSelector = (state) => state.products;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
