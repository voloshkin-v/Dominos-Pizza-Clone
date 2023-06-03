import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductItem } from './types';

export const fetchData = createAsyncThunk(
	'products/fetchDataStatus',
	async (params: Record<string, string>) => {
		const { query, category, sort } = params;

		const response = await fetch(
			`http://localhost:3001/pizzas?${query}${category}${sort}`
		);

		const data = (await response.json()) as ProductItem[];

		return data;
	}
);
