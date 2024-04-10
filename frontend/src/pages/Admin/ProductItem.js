import React from 'react';

const ProductItem = ({ product, onDelete }) => {
    return (
        <tr>
            <td>{product.productName}</td>
            <td>{product.productPrice}</td>
            <td>{product.productPhoto}</td>
            <td>{product.productStorage}</td>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => onDelete(product._id)}
            >
                Delete Product
            </button>
        </tr>
    );
};

export default ProductItem;