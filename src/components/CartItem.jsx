import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import numberWithCommas from './../utils/numberWithCommas';
import { deleteItem, updateItem } from '../redux/shopping-cart/cartItemSlice';

const CartItem = props => {

    const dispatch = useDispatch()

    const [item, setitem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity)


    useEffect(() => {
        setitem(props.item)
        setQuantity(props.item.quantity)

    }, [props.item])
    const updateQuantity = (type) => {
        if (type === "+") {
            dispatch(updateItem({ ...item, quantity: quantity + 1 }))
            // setQuantity(quantity + 1)
        }
        if (type === "-") {
            if (quantity - 1 < 1) {
                dispatch(deleteItem(item))
            } else {
                dispatch(updateItem({ ...item, quantity: quantity - 1 }))
            }

            // setQuantity(quantity - 1 > 1 ? quantity - 1 : 1)
        }
    }
    const removeCartItem = () => {
        dispatch(deleteItem(item))
    }
    return (
        <div>
            <div className="cart_item">
                <div className="cart_item_image">
                    <img src={item.product.image01} alt="" />

                </div>
                <div className="cart_item_info">
                    <div className="cart_item_info_name">
                        <Link to={`/catalog/${item.slug}`}>
                            {`${item.product.title} - ${item.color} - ${item.size}`}
                        </Link>
                    </div>
                    <div className="cart_item_info_price">
                        {numberWithCommas(item.product.price)}

                    </div>
                    <div className="cart_item_info_quantity">
                        <div className="product_info_item_quantity">
                            <div className="product_info_item_quantity_btn" onClick={() => updateQuantity('-')} >
                                <i className='bx bx-minus'></i>
                            </div>
                            <div className="product_info_item_quantity_input">
                                {quantity}
                            </div>
                            <div className="product_info_item_quantity_btn" onClick={() => updateQuantity('+')}>
                                <i className='bx bx-plus'></i>
                            </div>
                        </div>
                    </div>
                    <div className="cart_item_info_del" onClick={() => removeCartItem()}>
                        <i className='bx bx-trash'></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
}

export default CartItem