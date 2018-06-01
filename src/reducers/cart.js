import { getProduct } from './products';

// actions
const CART_ADD   = 'cart/ADD';
const CART_REMOVE = 'cart/REMOVE';

// reducer
const initialState = {
    items: []
};

export default function cart(state = initialState, action = {}) {
    switch (action.type) {
        case CART_ADD:
            return handleCartAdd(state, action.payload);
        case CART_REMOVE:
            return handleCartRemove(state, action.payload);
        default:
            return state;
    }
}

function handleCartAdd(state, payload) {
    let counter = getCounter(state, payload.productId);
        return (counter>1? updateCounterForId(state,payload.productId, counter): {
        ...state,
        items: [ ...state.items, {cartItemData: [payload.productId, 1]}]
    })
}

function handleCartRemove(state, payload) {
    let counter = decrementCounter(state, payload.productId);

    return (counter===0? {
        ...state,
        items: state.items.filter(id => id.cartItemData[0] !== payload.productId)
    }: updateCounterForId(state,payload.productId, counter))
}

function updateCounterForId(state, productId, counter) {
    state.items.forEach

    return { 
       ...state, 
       items: state.items.map(
           (content, i) => content.cartItemData[0] === productId ? {cartItemData: [productId, counter]}
                                   : content
       )
    }
}

export function addToCart(productId) {
    return {
        type: CART_ADD,
        payload: {
            productId
        }
    }
}

export function removeFromCart(productId) {
    return {
        type: CART_REMOVE,
        payload: {
            productId
        }
    }
}

export function getCounter(state, productId) {
    let counter = 0, flag=false;
    state.items.forEach((id) => {
        if(id.cartItemData[0]===productId){
            flag=id.cartItemData[1];
        }
    })
    counter = flag? flag+1: 1;
    return counter;
}

export function decrementCounter(state, productId) {
    let flag=false;
    state.items.forEach((id) => {
        if(id.cartItemData[0]===productId){
            flag=id.cartItemData[1];
        }
    })
    return flag-1;
}

export function getItems(state, props) {
    return state.cart.items.length ? state.cart.items.map(id => getProduct(state, { id })): [];
}

export function getTotal(state, props) {
    return state.cart.items.reduce((acc, id) => {
        const item = getProduct(state, { id });
        return acc + parseFloat(item.defaultVariant.mrp)*id.cartItemData[1];
    }, 0);
}
