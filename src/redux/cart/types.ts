export type CartItem = {
	id: number;
	title: string;
	imageUrl: string;
	imageAlt: string;
	price: number;
	type: string;
	size: number;
	count: number;
};

export interface CartSliceState {
	totalPrice: number;
	totalAmount: number;
	items: CartItem[];
}
