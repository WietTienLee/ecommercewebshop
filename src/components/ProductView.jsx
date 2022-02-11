import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import numberWithCommas from './../utils/numberWithCommas';
import { Link, Route, useNavigate } from 'react-router-dom';
import Cart from './../pages/Cart';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/shopping-cart/cartItemSlice';
import { remove } from '../redux/product-modal/productModalSlice';
const ProductView = (props) => {
    const dispatch = useDispatch()

    let product = props.product
    if (product === undefined) {
        product = {
            price: 0,
            title: 0,
            colors: [],
            size: []
        }
    }
    const [previewImg, setpreviewImg] = useState(product.image01);
    const [descriptionExpand, setdescriptionExpand] = useState(false);
    const viewModal = useSelector((state) => state?.productModal.value)
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }
    useEffect(() => {
        setpreviewImg(product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);

    }, [product]);
    const check = () => {
        if (color === undefined) {
            alert('Vui Lòng Chọn màu sắc!')
            return false
        }
        if (size === undefined) {
            alert('Vui Lòng Chọn kích thước!')
            return false
        }
        return true
    }
    const addToCart = () => {
        if (check()) {
            console.log({ color, size, quantity })
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price
            }))
        }
    }
    const goToCart = () => {
        if (check()) {
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price
            }))
            if (viewModal !== null) {
                dispatch(remove())
            }
            navigate('/cart')
        }
    }
    return (
        <div className='product'>
            <div className="product_images">
                <div className="product_images_list">
                    <div className="product_images_item">
                        <img src={product.image01} alt='' onClick={() => setpreviewImg(product.image01)} />

                    </div>
                    <div className="product_images_item">
                        <img src={product.image02} alt='' onClick={() => setpreviewImg(product.image02)} />
                    </div>
                </div>
                <div className="product_images_main">
                    <img src={previewImg} alt='' />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description_title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description_content" dangerouslySetInnerHTML={{ __html: product.description }}>

                    </div>
                    <div className="product-description_toggle">
                        <Button size="sm" onClick={() => setdescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : ' Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product_info">
                <h1 className="product_info_title">
                    {product.title}
                </h1>
                <div className="product_info_item">
                    <span className="product_info_item_price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                <div className="product_info_item">
                    <div className="product_info_item_title">
                        Màu sắc
                    </div>
                    <div className="product_info_item_list">
                        {
                            product.colors.map((item, index) => (
                                <div key={index} className={`product_info_item_list_item ${color === item ? 'active' : ''}`}
                                    onClick={() => setColor(item)}

                                >
                                    <div className={`circle bg-${item}`}>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product_info_item">
                    <div className="product_info_item_title">
                        Kích thước
                    </div>
                    <div className="product_info_item_list">
                        {
                            product.size.map((item, index) => (
                                <div key={index} className={`product_info_item_list_item ${size === item ? 'active' : ''}`}
                                    onClick={() => setSize(item)}
                                >
                                    <div className="product_info_item_list_item_size">
                                        {item}
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product_info_item">
                    <div className="product_info_item_title">
                        Số lượng
                    </div>
                    <div className="product_info_item_quantity">
                        <div className="product_info_item_quantity_btn" onClick={() => updateQuantity('minus')}>
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="product_info_item_quantity_input">
                            {quantity}
                        </div>
                        <div className="product_info_item_quantity_btn" onClick={() => updateQuantity('plus')}>
                            <i className='bx bx-plus'></i>
                        </div>
                    </div>
                </div>
                <div className="product_info_item">
                    <Button size="sm" onClick={() => addToCart()}> Thêm vào giỏ hàng</Button>
                    <Button size="sm" onClick={() => goToCart()}> Mua Ngay</Button>
                </div>
                <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description_title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description_content" dangerouslySetInnerHTML={{ __html: product.description }}>

                    </div>
                    <div className="product-description_toggle">
                        <Button size="sm" onClick={() => setdescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : ' Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object,
};

export default (ProductView);
