import React, { useEffect, useState } from 'react';
import productData from './../assets/fake-data/products';
import Button from './Button';
import ProductView from './ProductView';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../redux/product-modal/productModalSlice';
const ProductViewModal = () => {
    const productSlug = useSelector((state) => state.productModal.value)
    const dispatch = useDispatch()
    const [product, setproduct] = useState(undefined);
    // const product = productData.getProductBySlug('ao-somi-tay-dai-17')
    useEffect(() => {
        setproduct(productData.getProductBySlug(productSlug));
    }, [productSlug]);

    return (
        <div className={`product-view_modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view_modal_content">
                <ProductView product={product} />
                <div className="product-view_modal_content_close">
                    <Button size="sm"
                        onClick={() => dispatch(remove())}
                    >
                        Đóng
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default ProductViewModal;
