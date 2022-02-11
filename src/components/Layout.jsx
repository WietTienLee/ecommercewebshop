import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProductViewModal from './ProductViewModal';
import Myroute from '../routes/MyRoute';

const Layout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={
                    <div>
                        <div className='container'>
                            <Header />
                            <div className="main">
                                <Myroute />
                            </div>
                        </div>
                        <Footer />
                        <ProductViewModal />
                    </div>

                } />
            </Routes>
        </BrowserRouter>

    );
};

export default Layout;
