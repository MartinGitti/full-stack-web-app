import React from 'react';// React Library.
import axios from 'axios';// HTTP Requests.
import GoogleLogin from 'react-google-login';// 3rd Party Login API.
import '../stylesheets/style.css';// Ciustom Style Sheet.

// Google Api Login Component:
const Google = ({ informParent = f => f, thisComponent }) => {
    const responseGoogle = (response) => {
        // request to backend
        // // console.log(response.tokenId);

        axios({
            method: 'POST',
            url: `/auth/google-loggin`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                // // console.log('GOOGLE SIGNING SUCCESS', response)
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                // // console.log('GOOGLE SIGNING ERROR', error.response)
                //
            })
    };

    return (
        <div className="google-login">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Login/Signin with Google"
            />
        </div>
    );
};

export default Google;