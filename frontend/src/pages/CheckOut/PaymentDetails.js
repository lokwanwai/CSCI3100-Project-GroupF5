// pages/CheckOut/PaymentDetails.js
import React from 'react';

const PaymentDetails = ({ formData, handleInputChange }) => {
    return (
        <div className='mt-4'>
            <h2>Payment Details</h2>
            <div className="payment-methods d-flex justify-content-start align-items-center mb-3">
                <img src="payment-logos/masterCard_logo.svg" alt="MasterCard" className="payment-logo" />
                <img src="/payment-logos/visa_logo.svg" alt="Visa" className="payment-logo mx-2 " />
            </div>
            <div className="row mt-2">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Card Holder Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cardHolderName"
                            value={formData.cardHolderName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;