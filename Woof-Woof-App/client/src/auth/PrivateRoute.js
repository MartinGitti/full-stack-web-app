import React from 'react';// eact library.
import { Route, Redirect } from 'react-router-dom';// React Routing Components.
import { isAuth } from './Helpers.jsx';// Athenticate from Helpers Component.

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )}
    />
);

export default PrivateRoute;