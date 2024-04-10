import React from 'react';
import './style.css';

const ProductItem = ({ product, onDelete }) => {
    return (
        <tr>
            <td>{product.productName}</td>
            <td>{product.productPrice}</td>
            <td>
                <img
                    src={`http://localhost:5001/api/products/image/${product.productID}`}
                    alt="Product"
                />
            </td>
            <td>{product.productStorage}</td>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => onDelete(product.productName)}
            >
                Delete Product
            </button>
        </tr>
    );
};

export default ProductItem;