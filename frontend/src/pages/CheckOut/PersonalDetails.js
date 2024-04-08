// pages/CheckOut/PersonalDetails.js
import React from 'react';

const PersonalDetails = () => {
    return (
        <div className='mt-5'>
            <h2>Personal Details</h2>
            <div className='my-3'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input type="tel" className="form-control" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PersonalDetails;