import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartSuccessOrder: React.FC = () => {
   return (
      <div className="cart cart--empty">
         <h2>Ваш заказ оформлен!</h2>
         <p>
            Скоро мы свяжемся с вами для уточнения деталей заказа
            <br />
            Пока можете вернуться на главную страницу и посмотреть остальной ассортимент
         </p>
         <img src={cartEmptyImg} alt="Empty cart" />
         <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
         </Link>
      </div>
   );
};
