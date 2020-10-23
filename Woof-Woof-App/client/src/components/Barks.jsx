import React, { useState, useEffect } from 'react';// React Library.
import axios from 'axios';// HTTP Requests.
import { ToastContainer, toast } from 'react-toastify';// Easy use of adding notification to app.
import 'react-toastify/dist/ReactToastify.min.css';// Use Toastify styling.
import '../stylesheets/style.css';// Custom Style Sheet.
// Import Components:
import { getCookie, signout } from '../auth/Helpers';// Helpers Component.
import DeleteBark from './RemoveBark';// Import Bark Component.
import UpdateBark from './EditBark';
import logo from '../images/barking.png';// Import image.

// Component to handle user barks:
const Barks = ({ history }) => {
    // Signup State:
    const [values, setValues] = useState({
        bark: '',
        barks: [],
        loading: true,
    });

    const { bark, barks, loading } = values;

    const token = getCookie('token');

    useEffect(() => {
        loadBarks();
    }, []);

    // Display all user  barks in database.
    const loadBarks = () => {
        axios({
            method: 'GET',
            url: `/barks`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                // console.log('PRIVATE PROFILE UPDATE', response)
                const barks = response.data.barks;
                setValues({ ...values, barks, bark: '', loading: false });
            })
            .catch((error) => {
                // console.log('Load Barks error', error.response.data.error);
                if (error.response.status === 401) signout(() => history.push('/'));
            });
    };

    // Get user input from form:
    const handleChange = (e) => setValues({ ...values, bark: e.target.value });

    // User can add a new Bark to database:
    const addBark = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `/barks/new`,
            data: { bark },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setValues({ ...values, bark: ' ' });
                toast.success(response.data.message);
            })
            .then(loadBarks)
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    };

    // User can remove bark from database:
    const deleteBark = (id) => {
        axios({
            method: 'DELETE',
            url: `/barks/${id}`,
            data: { bark },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                toast.success(response.data.message);
            })
            .then(loadBarks)
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    };

    const updateBark = (id) => {
        axios({
            method: 'PUT',
            url: `/barks/update/${id}`,
            data: { bark },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                toast.success(response.data.message);
            })
            .then(loadBarks)
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    };

    // Bark field that take in user input:
    const barkForm = () => (
        <form onSubmit={addBark}>
            <div className="form-group">
                <label className="insert-bark">Insert a Bark!</label>
                <input onChange={handleChange} value={bark} type="text" required className="form-control" />
            </div>
        </form>
    );

    return (
        <div className="col-md-6 offset-md-3 woof-user-form">
            <ToastContainer />
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="p-5 text-center bark-page-header">Bark Page <span role='img' aria-label="dog-face">🐶</span></h1>
            <p>Send your barks and be heard!</p>
            <p className="send-barks-header">Bark away...<span role='img' aria-label="dog">🐕</span></p>
            {barkForm()}

            {loading == true ? (
                <h1 className="pt-5 text-center ">Loading...</h1>
            ) : barks.length == 0 ? (
                <React.Fragment>
                    <h3 className="pt-5 text-center">No Barks!</h3>
                    <p className="lead text-center">Add your bark in the field above.</p>
                </React.Fragment>
            ) : (
                        <ul className="list-group list-group-flush">
                            <li>
                                <h2 className="sub-heading">Remove a bark!</h2>
                                {barks.map((barkObject) => (
                                    <DeleteBark
                                        barkObject={barkObject}
                                        key={barkObject._id}
                                        deleteBark={deleteBark}
                                    />
                                ))}
                                <p className="instructions">To remove a bark, simply click delete on the bark you wish to remove...</p>
                            </li>
                            <li>
                                <h2 className="sub-heading">Edit bark!</h2>
                                {barks.map((barkObject) => (
                                    <UpdateBark
                                        barkObject={barkObject}
                                        key={barkObject._id}
                                        updateBark={updateBark}
                                    />
                                ))}
                                <p className="instructions">Add your bark in the 'Insert a bark' field above and click update on the bark you wish to change...</p>
                            </li>
                        </ul>
                    )}
        </div>
    );
};

export default Barks;