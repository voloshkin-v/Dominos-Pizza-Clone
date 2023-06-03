export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type ProductItem = {
	id: number;
	imageUrl: string;
	imageAlt: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number[];
};

export interface ProductsSliceState {
	items: ProductItem[];
	status: Status;
}
