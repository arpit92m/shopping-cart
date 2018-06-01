import React, { Component } from "react";
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { getItems, getTotal, removeFromCart } from '../reducers/cart';

class Cart extends Component{

  getCounter=(cart, id)=> {
    let counter;
    cart.forEach((item)=>{
        if(item.cartItemData[0] === id){
          counter= item.cartItemData[1];
        }
    })
    return counter;
  }


    render() {
        const {items, total, removeFromCart, cartData} = this.props;

        return (
            <div>
                <div className="cart">                
                <h3>Shopping Cart</h3>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {items.length > 0 && (
                                <div className="cart__body">
                                    {items.map(item => (
                                        <CartItem key={item.id} {...item} counter={this.getCounter(cartData, item.defaultVariant.full_name)} onClick={() => removeFromCart(item.defaultVariant.full_name)} />
                                    ))}
                                </div>
                            )}
                            {items.length === 0 && (
                                <div className="alert alert-info">Cart is empty</div>
                            )}
                        </div>
                        <div className="cart__total">Total: {total}</div>
                    </div>
                </div>
            </div>
        );
    }      
}

Cart.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    currency: PropTypes.string,
    removeFromCart: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
    return {
        items: getItems(state, props),
        total: getTotal(state, props),
        cartData: state.cart.items
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (id) => dispatch(removeFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

