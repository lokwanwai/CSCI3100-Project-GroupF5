import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddToCartButton = ({ items, quantity, onPayment }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const selectedItems = items.filter((item) => item.selected);
        navigate('/success', { state: { items: selectedItems } });
    };

    const isDisabled = quantity <= 0;

    return (
        <tr>
            <td colSpan="4"></td>
            <td>
                <button
                    className="btn payment-button"
                    onClick={handleClick}
                    disabled={isDisabled}
                    style={{
                        backgroundColor: '#111111',
                        color: '#FFFFFF',
                        borderRadius: '40px',
                        padding: '12px 24px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isDisabled ? 0.6 : 1,
                    }}
                >
                    Add to Cart
                </button>
            </td>
        </tr>
    );
};

export default PaymentButton;
