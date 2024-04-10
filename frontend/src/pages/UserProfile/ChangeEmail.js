import React from 'react';

const ChangeEmail = ({ user, onChangeEmail }) => {
    return (
        <tr>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => onChangeEmail(user.userName)}
            >
                Change e-mail address
            </button>
        </tr>
    );
};

export default ChangeEmail;

