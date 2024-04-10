import React from 'react';

const ProductItem = ({ item }) => {
    return (
      <div className="card">
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
      </div>
    );
  };
export default ProductItem;