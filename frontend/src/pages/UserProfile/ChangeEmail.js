import React from 'react';

const ChangeEmail  = ({ user, changeEmail }) => {
    return (
        <tr>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => changeEmail(user.userName)}
            >
                Change e-mail address
            </button>
        </tr>
    );
};

export default ChangeEmail;
