import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
    return (
      <div className="card">
        <img src={item.productImage} alt={item.productName} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{item.productName}</h5>
          <p className="card-text">Price: ${item.productPrice}</p>
        </div>
      </div>
    );
  };
export default ProductItem;