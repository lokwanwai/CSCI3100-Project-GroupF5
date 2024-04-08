import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({ items, total, onPayment }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onPayment();
        const selectedItems = items.filter((item) => item.selected);
        navigate('/checkout', { state: { items: selectedItems } });
    };

    const isDisabled = total <= 10;

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
                    Proceed to Payment (${total.toFixed(2)})
                </button>
            </td>
        </tr>
    );
};

export default PaymentButton;