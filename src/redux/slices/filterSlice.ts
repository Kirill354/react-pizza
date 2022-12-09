import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TSort = {
   name: string;
   sortProperty: 'rating' | 'title' | 'price';
};

export interface FilterSliceState {
   categoryId: number;
   sortType: TSort;
   page: number;
   searchValue: string;
}

const initialState: FilterSliceState = {
   categoryId: 0,
   sortType: {
      name: 'популярности',
      sortProperty: 'rating',
   },
   page: 1,
   searchValue: '',
};

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },
      setSortType(state, action: PayloadAction<TSort>) {
         state.sortType = action.payload;
      },
      setPage(state, action: PayloadAction<number>) {
         state.page = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>) {
         if (Object.keys(action.payload).length) {
            state.page = Number(action.payload.page);
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
         } else {
            state.page = 1;
            state.categoryId = 0;
            state.sortType = {
               name: 'популярности',
               sortProperty: 'rating',
            };
         }
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
   },
});

export const { setCategoryId, setSortType, setPage, setFilters, setSearchValue } =
   filterSlice.actions;
export default filterSlice.reducer;
