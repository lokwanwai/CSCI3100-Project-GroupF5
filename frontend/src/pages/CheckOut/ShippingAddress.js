// pages/CheckOut/ShippingAddress.js
import React from 'react';

const ShippingAddress = () => {
    return (
        <div className='mt-4'>
            <h2>Shipping Address</h2>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddress;