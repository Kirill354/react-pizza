import { TCartItem } from '../redux/slices/cartSlice';

export const getDataFromLS = () => {
   const data: TCartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
   return {
      data,
      price: data.reduce((sum, obj) => {
         return obj.quantity * obj.price + sum;
      }, 0),
   };
};
