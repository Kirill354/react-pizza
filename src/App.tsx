import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const PizzaInfo = React.lazy(
   () => import(/* webpackChunkName: "PizzaInfo" */ './components/PizzaInfo'),
);
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
   return (
      // <div className="wrapper">
      //    <Header />
      //    <div className="content">
      //       <Routes>
      //          <Route path="/" element={<Home />} />
      //          <Route path="/pizza/:id" element={<PizzaInfo />} />
      //          <Route path="/cart" element={<Cart />} />
      //          <Route path="*" element={<NotFound />} />
      //       </Routes>
      //    </div>
      // </div>
      <Suspense>
         <Routes>
            <Route path="/" element={<MainLayout />}>
               <Route path="" element={<Home />} />
               <Route path="pizza/:id" element={<PizzaInfo />} />
               <Route path="cart" element={<Cart />} />
               <Route path="*" element={<NotFound />} />
            </Route>
         </Routes>
      </Suspense>
   );
}

export default App;
