import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

export const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
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

			state.totalPrice = state.items.reduce(
				(accumulator, currentValue) => {
					return (
						accumulator + currentValue.price * currentValue.count
					);
				},
				0
			);
		},
		decrementItem: (state, action) => {
			const findItem = state.items.find(
				({ id, size, type }) =>
					id === action.payload.id &&
					size === action.payload.size &&
					type === action.payload.type
			);

			findItem.count--;

			state.totalPrice = state.items.reduce(
				(accumulator, currentValue) => {
					return (
						accumulator + currentValue.price * currentValue.count
					);
				},
				0
			);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter(
				({ id, size, type }) =>
					id !== action.payload.id ||
					size !== action.payload.size ||
					type !== action.payload.type
			);

			state.totalPrice = state.items.reduce(
				(accumulator, currentValue) => {
					return (
						accumulator + currentValue.price * currentValue.count
					);
				},
				0
			);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, clearItems, incrementItem, decrementItem } =
	cart.actions;

export default cart.reducer;
