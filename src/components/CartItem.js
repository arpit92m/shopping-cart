import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ defaultVariant, counter, onClick }) => {
    return (
        <div className="cart-item">
            <div>
                <button className="btn btn-danger btn-xs" onClick={onClick}>X</button>
                <span className="cart-item__name">{`${defaultVariant.full_name} X ${counter}`}</span>
            </div>
            <div className="cart-item__price">
                <i className="fa fa-inr" aria-hidden="true"></i>
                <span className="cart-item__name">{parseFloat(defaultVariant.mrp)*counter}</span>
             </div>
        </div>
    );
}

CartItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CartItem;
