import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../constants/ActionTypes";
import { APP_ID } from "../constants/generalConstants";

import axios from "axios";

export const fetchData = (type) => (dispatch) => {

const zopnow_url ="https://www.zopnow.com/toys/discounts.json";

return axios.get(zopnow_url)
    .then((response) => {

      dispatch({type: FETCH_DATA_FULFILLED, payload: getDataByType(type, response)});
    })
    .catch((err) => {
      dispatch({type: FETCH_DATA_REJECTED, payload: err}); // Error handling
    });
};

function getDataByType(type, response) {
  return type ? response.data[1].data.products.sort(compare(type)): response.data[1].data.products;
}

function compare(type) {

return function(a, b) {
let comparison = 0;
  if (parseFloat(a.defaultVariant[type]) > parseFloat(b.defaultVariant[type])) {
    comparison = 1;
  } else if (a.defaultVariant[type] < b.defaultVariant[type]) {
    comparison = -1;
  }
  return comparison;
}
}
