import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './PizzaInfo.module.scss';

import { SkeletonPizInf } from './SkeletonPizInf';

type Pizza = {
   imageUrl: string;
   title: string;
   price: number;
};

const PizzaInfo: React.FC = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [pizza, setPizza] = useState<Pizza>();

   useEffect(() => {
      async function fetchPizzaInfo() {
         try {
            const { data } = await axios.get(
               `https://636f96c4bb9cf402c81b0b5b.mockapi.io/items/${id}`,
            );
            setPizza(data);
         } catch (error) {
            alert('Пицца не найдена:(');
            navigate('/');
         }
      }
      fetchPizzaInfo();
      // eslint-disable-next-line
   }, []);

   if (!pizza) {
      return (
         <div className={styles.root}>
            <SkeletonPizInf />
         </div>
      );
   }

   return (
      <div className="container">
         <div className={styles.root}>
            <img className={styles.img} src={pizza.imageUrl} alt="Пицца" />
            <h2 className={styles.title}>{pizza.title}</h2>
            <span className={styles.price}>{pizza.price} ₽</span>
            <Link to="/">
               <button className="button button--black">На главную</button>
            </Link>
         </div>
      </div>
   );
};

export default PizzaInfo;
