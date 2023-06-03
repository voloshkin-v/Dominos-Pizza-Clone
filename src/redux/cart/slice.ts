import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCartFromLS } from '../../utils/getCartFromLS';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';
import { calculateTotalAmount } from '../../utils/calculateTotalAmount';

import { CartSliceState, CartItem } from './types';

const itemsData = getCartFromLS();

const initialState: CartSliceState = {
	totalPrice: calculateTotalPrice(itemsData),
	totalAmount: calculateTotalAmount(itemsData),
	items: itemsData,
};

export const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find(
				({ id, size, type }) =>
					id === action.payload.id &&
					size === action.payload.size &&
					type === action.payload.type
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalAmount = calculateTotalAmount(state.items);
			state.totalPrice = calculateTotalPrice(state.items);
		},
		decrementItem: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find(
				({ id, size, type }) =>
					id === action.payload.id &&
					size === action.payload.size &&
					type === action.payload.type
			);

			if (findItem) {
				findItem.count--;
			}

			state.totalAmount = calculateTotalAmount(state.items);
			state.totalPrice = calculateTotalPrice(state.items);
		},
		removeItem: (state, action: PayloadAction<CartItem>) => {
			state.items = state.items.filter(
				({ id, size, type }) =>
					id !== action.payload.id ||
					size !== action.payload.size ||
					type !== action.payload.type
			);

			state.totalAmount = calculateTotalAmount(state.items);
			state.totalPrice = calculateTotalPrice(state.items);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
			state.totalAmount = 0;
		},
	},
});

export const { addItem, removeItem, clearItems, decrementItem } = cart.actions;

export default cart.reducer;
