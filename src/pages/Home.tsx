import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { sorts } from '../components/Sort';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components/index';

import { FilterSliceState, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const { categoryId, sortType, page, searchValue } = useSelector(
      (state: RootState) => state.filter,
   );
   const { items, status } = useSelector((state: RootState) => state.pizza);

   const isQueryParamsSearch = useRef(false);
   const isMounted = useRef(false);

   const getPizzas = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortBy = sortType.sortProperty;
      const search = searchValue ? `&title=${searchValue}` : '';

      dispatch(
         fetchPizzas({
            category,
            sortBy,
            search,
            page,
         }),
      );
   };

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            categoryId,
            sortType: sortType.sortProperty,
            page,
         });
         navigate(`?${queryString}`);
      }
      isMounted.current = true;
      // eslint-disable-next-line
   }, [categoryId, sortType, page]);

   // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(
            window.location.search.substring(1),
         ) as unknown as FilterSliceState;
         const sortType = sorts.find((obj) => obj.sortProperty === (params.sortType as unknown));

         // console.log(params);
         // console.log({ ...params, sortType });
         if (sortType) {
            params.sortType = sortType;
            dispatch(setFilters(params));
            isQueryParamsSearch.current = true;
         }
      }
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      window.scrollTo(0, 0);

      if (!isQueryParamsSearch.current) {
         getPizzas();
      }

      isQueryParamsSearch.current = false;
      // eslint-disable-next-line
   }, [categoryId, sortType, searchValue, page]);

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort value={sortType} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className="content__error">
               <h2>
                  Список товаров пуст <span>😕</span>
               </h2>
               <p>
                  К сожалению, не удалось получить пиццы.
                  <br />
                  Попробуйте повторить попытку позже
               </p>
            </div>
         ) : (
            <>
               <div className="content__items">
                  {status === 'loading'
                     ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                     : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
               </div>
               <Pagination />
            </>
         )}
      </div>
   );
};

export default Home;
