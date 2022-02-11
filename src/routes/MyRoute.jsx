import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from './../pages/Product';
const Myroute = () => {
    return (
        <Routes>
            <Route path='/catalog/:slug' element={<Product />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Home />} />
        </Routes>
    );
};

export default Myroute;
