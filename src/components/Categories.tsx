import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = () => {
   const dispatch = useDispatch();
   const categoryId = useSelector((state: RootState) => state.filter.categoryId);

   return (
      <div className="categories">
         <ul>
            {categories.map((categorie, index) => (
               <li
                  className={categoryId === index ? 'active' : undefined}
                  onClick={() => dispatch(setCategoryId(index))}
                  key={index}>
                  {categorie}
               </li>
            ))}
         </ul>
      </div>
   );
};
