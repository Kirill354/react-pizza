import { TCartItem } from '../redux/slices/cartSlice';

export const getNumOfCartItems = (items: TCartItem[]): number => {
   return items.reduce((num: number, obj: TCartItem) => num + obj.quantity, 0);
};
