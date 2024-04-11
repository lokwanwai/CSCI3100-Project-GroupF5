import React from 'react';

const ChangePassword = ({ user, onChangePassword }) => {
    return (
        <tr>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => onChangePassword(user.userName)}
            >
                Change password
            </button>
        </tr>
    );
};

export default ChangePassword;
