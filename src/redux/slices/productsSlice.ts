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

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface ProductsSliceState {
	items: ProductItem[];
	status: Status;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
	status: Status.LOADING,
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
			if (state.status === 'loading') return;

			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.items = action.payload;
		});

		builder.addCase(fetchData.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const productsSelector = (state: RootState) => state.products;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
