import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type ProductItem = {
	id: number;
	imageUrl: string;
	imageAlt: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number[];
};

interface ProductsSliceState {
	items: ProductItem[];
	status: 'loading' | 'success' | 'error';
}

export const fetchData = createAsyncThunk(
	'products/fetchDataStatus',
	async (params: Record<string, string>) => {
		const { query, category, sort } = params;

		const response = await fetch(
			`http://localhost:3001/pizzas?${query}${category}${sort}`
		);

		const data = (await response.json()) as ProductItem[];

		return data;
	}
);

const initialState: ProductsSliceState = {
	items: [],
	status: 'loading',
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<ProductItem[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchData.pending, (state) => {
			state.status = 'loading';
			state.items = [];
		});

		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.status = 'success';
			state.items = action.payload;
		});

		builder.addCase(fetchData.rejected, (state) => {
			state.status = 'error';
			state.items = [];
		});
	},
});

export const productsSelector = (state: RootState) => state.products;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
