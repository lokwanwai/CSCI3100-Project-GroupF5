import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ item}) => {
    console.log("Entered OrderItem")
    console.log(item);
    const { id, name, price, quantity, shippingCost, total, orderDateTime, status } = item;

    return (
        <tr className="order-item">
            <td className="align-middle product-name">
                <div className="d-flex align-items-center">
                    <Link
                        to={`/product/${id}`}
                        style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}
                    >
                    <img
                        src={`http://localhost:5001/api/products/image/${id}`}
                        alt={name}
                        style={{ width: 'auto', height: '80%', marginRight: '10px' }}
                        className="d-none d-sm-block"
                    />
                    </Link>
                </div>
            </td>
            <td className="align-middle product-name">{name !== undefined ? name : ""}</td>
            <td className="align-middle product-price">${price !== undefined ? price : ""}</td>
            <td className="align-middle product-quantity">{quantity !== undefined ? quantity : ""}</td>
            <td className="align-middle product-shippingCost">${shippingCost !== undefined ? shippingCost.toFixed(2) : ""}</td>
            <td className="align-middle product-total">${total !== undefined ? total.toFixed(2) : ""}</td>
            <td className="align-middle product-orderDateTime">{orderDateTime !== undefined ? orderDateTime : ""}</td>
            <td className="align-middle product-status">{status !== undefined ? status : ""}</td>
        </tr>
    );
};

export default OrderItem;