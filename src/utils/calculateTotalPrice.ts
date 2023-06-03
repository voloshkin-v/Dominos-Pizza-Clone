import { CartItem } from '../redux/cart/types';

export const calculateTotalPrice = (items: CartItem[]) => {
	return items.reduce((accumulator, currentValue) => {
		return accumulator + currentValue.price * currentValue.count;
	}, 0);
};
