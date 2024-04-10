import React from 'react';

const ChangePassword  = ({ user, ChangePassword }) => {
    return (
        <tr>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => changeEmail(user.userName)}
            >
                Change password
            </button>
        </tr>
    );
};

export default ChangePassword;
