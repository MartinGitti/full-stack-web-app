import React from 'react';// React Library.
import '../stylesheets/style.css';// Custom Style Sheet.

// Remove specific user bark:
const DeleteBark = ({ barkObject, deleteBark }) => {
    const { _id, bark } = barkObject;

    return (
        <div className="list-group-item">
            <div className="bark-content">
                <h4>{bark}</h4>
                <div className="d-flex">
                    <button className="action-buttons btn btn-danger" onClick={deleteBark.bind(_id, _id)}>
                        Delete
					</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBark;
