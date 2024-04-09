import React from 'react';

const UserItem = ({ user, onDelete }) => {
    return (
        <tr class="user">
            <td>{user.name}</td>
            <td>{user.email}</td>
            <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                onClick={() => onDelete(user.id)}
            >
                Delete User
            </button>
        </tr>
    );
};

export default UserItem;