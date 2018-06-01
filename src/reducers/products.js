import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../constants/ActionTypes";

export default function products(state = {
  data: null,
  status: null
}, action) {
  switch (action.type) {
    case FETCH_DATA_FULFILLED: {
      return {
        ...state,
        data: action.payload,
        status: "success"
      };
      break;
    }
    case FETCH_DATA_REJECTED: {
      return {
        ...state,
        status: "failed"
      };

      console.error(`Could not fetch the data from webservice. ${action.payload}.`);
      break;
    }
  }

  return state;
}

export function getProduct(state, props) {
    return state.products.data.find(item => item.defaultVariant.full_name === props.id.cartItemData[0]);
}