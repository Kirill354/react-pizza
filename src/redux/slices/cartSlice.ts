import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataFromLS } from '../../utils/getPriceFromLS';
import { RootState } from '../store';

export type TCartItem = {
   id: string;
   image: string;
   price: number;
   title: string;
   type: string;
   size: number;
   quantity: number;
   removeAll?: boolean;
};

interface CartSliceState {
   totalPrice: number;
   items: TCartItem[];
}

const { price, data } = getDataFromLS();

const initialState: CartSliceState = {
   totalPrice: price,
   items: data,
};

const cartSlice = createSlice({
   initialState,
   name: 'cart',
   reducers: {
      addItem(state, action: PayloadAction<TCartItem>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);

         if (findItem) {
            findItem.quantity++;
         } else {
            state.items.push({
               ...action.payload,
               quantity: 1,
            });

            // state.items.push({
            //    ...action.payload,
            //    quantity: 1,
            // });
         }

         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.quantity * obj.price + sum;
         }, 0);
      },
      removeItem(state, action: PayloadAction<{ id: string; removeAll: boolean }>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (action.payload.removeAll) {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
         } else {
            if (findItem && findItem.quantity > 1) {
               findItem.quantity--;
            } else {
               state.items = state.items.filter((item) => item.id !== action.payload.id);
            }
         }

         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.quantity * obj.price + sum;
         }, 0);
      },
      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
