import React from 'react';// React Library.
import '../stylesheets/style.css';// Custom Style Sheet.

// Edit a specific user bark:
const UpdateBark = ({ barkObject, updateBark }) => {
    const { _id, bark } = barkObject;

    return (
        <div className="list-group-item">
            <div className="bark-content">
                <h4>{bark}</h4>
                <div className="d-flex">
                    <button className="action-buttons btn btn-danger" onClick={updateBark.bind(_id, _id)}>
                        Update
					</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBark;
