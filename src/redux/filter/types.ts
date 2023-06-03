export type SortItem = {
	name: string;
	slug: 'price' | '';
	orderBy: 'asc' | 'desc' | '';
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	sort: SortItem;
}
