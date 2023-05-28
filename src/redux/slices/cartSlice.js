import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	totalAmount: 0,
	items: [],
};

const calculateTotalPrice = (items) => {
	return items.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.price * currentValue.count;
	}, 0);
};

const calculateTotalAmount = (items) => {
	return items.reduce((accumulator, currentItem) => {
		return accumulator + currentItem.count;
	}, 0);
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

			state.totalAmount = calculateTotalAmount(state.items);
			state.totalPrice = calculateTotalPrice(state.items);
		},
		decrementItem: (state, action) => {
			const findItem = state.items.find(
				({ id, size, type }) =>
					id === action.payload.id &&
					size === action.payload.size &&
					type === action.payload.type
			);

			findItem.count--;

			if (findItem.count === 0) {
				state.items = state.items.filter(
					({ id, size, type }) =>
						id !== findItem.id ||
						size !== findItem.size ||
						type !== findItem.type
				);
			}

			state.totalAmount = calculateTotalAmount(state.items);
			state.totalPrice = calculateTotalPrice(state.items);
		},
		removeItem: (state, action) => {
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

export const cartSelector = (state) => state.cart;

export const { addItem, removeItem, clearItems, incrementItem, decrementItem } =
	cart.actions;

export default cart.reducer;
