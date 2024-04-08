import React from 'react';

const CartTotal = ({ subtotal, shippingFee, total }) => {
    return (
        <div className="d-flex justify-content-end cart-total">
            <div className="text-end" style={{ width: '300px' }}>
                <div className="d-flex justify-content-between">
                    <div className="me-5" style={{ fontSize: '16px', color: '#555555' }}>
                        <strong>Subtotal:</strong>
                    </div>
                    <div style={{ fontSize: '16px', color: '#555555' }}>
                        ${subtotal.toFixed(2)}
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="me-5" style={{ fontSize: '16px', color: '#555555' }}>
                        <strong>Shipping Fee:</strong>
                    </div>
                    <div style={{ fontSize: '16px', color: '#555555' }}>
                        ${shippingFee.toFixed(2)}
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="me-5" style={{ fontSize: '20px', color: '#111111' }}>
                        <strong>Total:</strong>
                    </div>
                    <div style={{ fontSize: '20px', color: '#111111' }}>
                        ${total.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;