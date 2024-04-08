// pages/CheckOut/PersonalDetails.js
import React from 'react';

const PersonalDetails = ({ formData, handleInputChange }) => {
    return (
        <div className='mt-5'>
            <h2>Personal Details</h2>
            <div className='my-3'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;