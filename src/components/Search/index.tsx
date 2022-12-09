import React, { useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search: React.FC = () => {
   const dispatch = useDispatch();
   const inputRef = useRef<HTMLInputElement>(null);
   const [value, setValue] = useState('');

   const onClearClick = () => {
      dispatch(setSearchValue(''));
      setValue('');
      inputRef.current?.focus();
   };

   // eslint-disable-next-line
   const onChangeSearch = useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str));
      }, 500),
      [],
   );

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChangeSearch(e.target.value);
   };

   return (
      <div className={styles.root}>
         <svg
            className={styles.icon_search}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path
               fill="rgba(0, 0, 0, 0.7)"
               d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            />
            material-symbols:close About Material Symbols: Author: Google License: Apache 2.0
            Customize "close" icon: Color #000 Size 24 24 Flip Horizontal Vertical Rotate 0° 90°
            180° 270° Mode Block Inline Code for "close" for developers: HTMLReactVueSvelteEmberSVG
            SVGSVG with viewBox rectangleSVG as data: URI
         </svg>
         {value && (
            <svg
               className={styles.icon_close}
               xmlns="http://www.w3.org/2000/svg"
               width="1em"
               height="1em"
               preserveAspectRatio="xMidYMid meet"
               viewBox="0 0 24 24"
               onClick={onClearClick}>
               <path
                  fill="rgba(0, 0, 0, 0.7)"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"
               />
            </svg>
         )}
         <input
            ref={inputRef}
            className={styles.input}
            onChange={onChangeInput}
            value={value}
            placeholder="Поиск пиццы..."
            type="text"
         />
      </div>
   );
};
