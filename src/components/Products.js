import React, { Component } from "react";
import { addToCart, removeFromCart, getItems } from '../reducers/cart';
import { connect } from 'react-redux';

class Products extends Component {
  constructor(props) {
   super(props);
   this.state = {
      items: 5,
      loadingState: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {

    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
    ) {
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    const {data}= this.props;
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({ items: data.length>this.state.items + 5? this.state.items + 5: data.length, loadingState: false });
    }, 3000);
  }

  getCounter=(cart, id)=> {
    let counter;
    cart.forEach((item)=>{
        if(item.cartItemData[0] === id){
          counter= item.cartItemData[1];
        }
    })
    return counter;
  }

  displayItems() {
    const { items, data, isInCart, addToCart, removeFromCart, cartData } = this.props;
    let products = [], inCart;
    for (let i = 0; i < this.state.items; i++) {
      inCart = this.isInCart(data[i].defaultVariant.full_name, items);
      products.push( (
            <div className="product-tile">
              <div className="primary-info">
                <div className="icon">
                  <img src={this._getIcon(data[i].defaultVariant)} />
                </div>
                {this._getItemPrice(data[i].defaultVariant)}
                {inCart ? 
                  <div className="plus-minus">
                    <i class="fa fa-minus-circle fa-2x border-icon" onClick={()=>{removeFromCart(data[i].defaultVariant.full_name)}} aria-hidden="true"></i>
                      <span> {this.getCounter(cartData, data[i].defaultVariant.full_name)}</span>
                    <i class="fa fa-plus-circle fa-2x border-icon" onClick={()=> {addToCart(data[i].defaultVariant.full_name)}} aria-hidden="true"></i>
                  </div> : 
                  <i class="fa fa-plus-circle fa-2x plus-css" onClick={()=> {addToCart(data[i].defaultVariant.full_name)}} aria-hidden="true"></i> }
              </div>
              <div className="detailed-info">
                <div>{data[i].defaultVariant.full_name}</div>
                <div className = "stock">{`${data[i].defaultVariant.stock} items available`}</div>
              </div>
            </div>
          ));
    }
    return products;
  }

  _getIcon = (data) => {
    return data.images[0];
  }

  _getItemPrice = (data) => {
    
     return (
      <div className="product-info">
        <div className="min-max">
        <i className="fa fa-inr" aria-hidden="true"></i>
          <span>
           <strong>{data.mrp-data.discount}</strong>
           <span className='mrp-cut'>
            <span className='mrp'>{data.mrp}</span>
          </span>
          </span>
        </div>
      </div>
    );
  };

  isInCart = (id, items) =>{
    let flag;
      if(items.length){
        items.forEach((item)=>{
          if(item.defaultVariant.full_name === id){
            flag = true;
          }
        })
      }
      else{
        flag = false;
      }
      return flag;
  }

  render() {

    return (
      <div className="product-wrapper">
        <div className="product-tiles">
          {this.displayItems()}
          {this.state.loadingState &&         
            <div className="loading">
              <div className="spinner"></div>
            </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    return {
      items: getItems(state, props),
      cartData: state.cart.items
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToCart: (id) => dispatch(addToCart(id)),
    removeFromCart: (id) => dispatch(removeFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);
// TODO: Add defaultProps and PropType validations
