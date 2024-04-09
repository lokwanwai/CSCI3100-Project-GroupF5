import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <tr>
            <td>{product.productName}</td>
            <td>{product.productPrice}</td>
            <td>{product.productPhoto}</td>
            <td>{product.productStorage}</td>
        </tr>
    );
};

export default ProductItem;