import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import productData from './../assets/fake-data/products';
import Helmet from './../components/Helmet';
import numberWithCommas from './../utils/numberWithCommas';

const Cart = () => {

    const cartItems = useSelector((state) => state.cartItems.value)
    const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems))
        setTotalProducts(cartItems.reduce((total, item) => total = total + Number(item.quantity), 0))
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0))

    }, [cartItems])

    return (
        <Helmet title='Giỏ Hàng'>
            <div className="cart">
                <div className="cart_info">
                    <div className="cart_info_txt">
                        <p>Bạn đang có {totalProducts} sản phẩm trong gỏ hàng</p>
                        <div className="cart_info_txt_price">
                            <span>Thành Tiền</span>
                            <span>{numberWithCommas(totalPrice)}</span>
                        </div>
                    </div>
                    <div className="cart_info_btn">
                        <Button size='block' >Đặt Hàng</Button>
                        <Link to="/catalog">
                            <Button size='block' >Tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className="cart_list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))
                    }
                </div>
            </div>

        </Helmet>
    );
};

export default Cart;
