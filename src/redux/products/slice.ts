import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductItem, ProductsSliceState, Status } from './types';

import { fetchData } from './asyncAction';

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

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
