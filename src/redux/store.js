import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import productsSlice from './slices/productsSlice';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		productsSlice,
	},
});
