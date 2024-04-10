import React from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';

const CartItem = ({ item, onQuantityChange, onRemove, onSelect }) => {
    const { id, name, price, quantity, stock, selected } = item;

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= stock) {
            onQuantityChange(itemId, newQuantity);
        }
    };

    return (
        <tr className="cart-item">
            <td className="align-middle" style={{ paddingLeft: '20px', width: '30px' }}>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(id)}
                    disabled={quantity > stock}
                />
            </td>
            <td className="align-middle product-name">
                <div className="d-flex align-items-center">
                    <div className="cart-product-image-container">
                        <img
                            src={`http://localhost:5001/api/products/image/${id}`}
                            alt={name}
                            className="img-fluid rounded cart-product-image d-none d-sm-block"
                        />
                    </div>
                    <Link
                        to={`/product/${id}`}
                        style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}
                    >
                        {name}
                    </Link>
                </div>
            </td>
            <td className="align-middle product-price">${price.toFixed(2)}</td>
            <td className="align-middle product-quantity">
                {quantity > stock ? (
                    <span style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>
                        Sold Out
                    </span>
                ) : (
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => handleQuantityChange(id, quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="mx-3">{quantity}</span>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => handleQuantityChange(id, quantity + 1)}
                            disabled={quantity >= stock}
                        >
                            +
                        </button>
                    </div>
                )}
            </td>
            <td className="align-middle product-total">${(price * quantity).toFixed(2)}</td>
            <td className="align-middle product-remove">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="red"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onRemove(id)}
                >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </td>
        </tr>
    );
};

export default CartItem;