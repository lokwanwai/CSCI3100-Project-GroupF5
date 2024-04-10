import React from 'react';

const UserItem = ({ user, onDelete }) => {
    return (
        <tr>
            <td>{user.userName}</td>
            <td>{user.userEmail}</td>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => onDelete(user._id)}
            >
                Delete User
            </button>
        </tr>
    );
};

export default UserItem;