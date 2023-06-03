import { CartItem } from '../redux/cart/types';

export const calculateTotalAmount = (items: CartItem[]) => {
	return items.reduce((accumulator, currentItem) => {
		return accumulator + currentItem.count;
	}, 0);
};
