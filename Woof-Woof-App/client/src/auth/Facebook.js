import React from 'react'; // React Library.
import axios from 'axios'; // Use axios to return a promise for HTTP requests.
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';// Facebook Login Package.

// 3rd Facebook login API Component:
const Facebook = ({ informParent = (f) => f, thisComponent }) => {
    const responseFacebook = (response) => {
        // Request to backend:
        axios({
            method: 'POST',
            url: `/auth/facebook-loggin`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            .then((response) => {
                // console.log('FACEBOOK SIGNING SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch((error) => {
                console.log('FacebooK signin error!', error.response);
            });
    };

    return (
        <div className="facebook-login">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={(renderProps) => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="facebook-logo"
                    >Facebook
                    </button>
                )}
            />
        </div>
    );
};

export default Facebook;