import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
    return (
      <div className="card">
        <Link to={`/product/${item.productID}`}>
        <div>
          <img
            src={`http://localhost:5001/api/products/image/${item.productID}`}
            alt="Product"
            className="img-fluid rounded product-image"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.productName}</h5>
          <p className="card-text">${item.productPrice}</p>
        </div>
        </Link>
      </div>
    );
  };
export default ProductItem;