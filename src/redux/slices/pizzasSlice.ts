import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type PizzaItem = {
   id: string;
   imageUrl: string;
   price: number;
   rating: number;
   sizes: number[];
   title: string;
   types: number[];
};

interface PizzaSliceState {
   items: PizzaItem[];
   status: 'loading' | 'success' | 'error';
}

type FetchPizzaArgs = {
   category: string;
   sortBy: string;
   search: string;
   page: number;
};

const url = process.env.REACT_APP_MOCK_API;
export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaArgs>(
   'pizza/fetchPizzasStatus',
   async ({ category, sortBy, search, page }) => {
      const { data } = await axios.get<PizzaItem[]>(
         `${url}/items?page=${page}&limit=4&${category}&sortBy=${sortBy}${search}`,
      );
      return data;
   },
);

const initialState: PizzaSliceState = {
   items: [],
   status: 'loading',
};

const pizzasSlice = createSlice({
   name: 'pizzaItems',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
         state.status = 'loading';
         state.items = [];
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.status = 'success';
         state.items = action.payload;
      });
      builder.addCase(fetchPizzas.rejected, (state) => {
         state.status = 'error';
         state.items = [];
      });
   },
});

export default pizzasSlice.reducer;
