import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchData } from "./actions/zapnow";

import Products from './components/Products';
import Cart from './components/Cart';

const sortTypes = ['mrp', 'stock', 'discount'];

@connect(store => {  
  return {
    zopnowData: store.products.data
  }
})

export default class App extends Component {

  constructor(props){
    super(props);

    this.sortElementByType = this.sortElementByType.bind(this);
  }


  // Fetches data by using geolocation. If the user blocks, or if the browser does not support the API, 
  // fallsback to default location of London

  sortElementByType(e) {
    const{ dispatch } = this.props;

    dispatch(fetchData(e.target.value));

  }

  componentDidMount() {  
    const{ dispatch } = this.props;

    dispatch(fetchData());

  }

  render() {
    const { zopnowData } = this.props;

    return (
      !zopnowData ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
      <div>
      <div include="form-input-select()">
      <select onChange = {this.sortElementByType} >
      <option value=""
            hidden
      >sort options</option>
      {sortTypes.map((type)=>{
        return <option value={type}>{type}</option>
      })}
      </select>
      </div>
      <div className="row">
        <div className="col-md-8">
          <Products data={zopnowData} />
        </div>

        <div className="col-md-4">
          <Cart data={zopnowData} />
        </div>
      </div>
      </div>
      )
    );
  }
}

