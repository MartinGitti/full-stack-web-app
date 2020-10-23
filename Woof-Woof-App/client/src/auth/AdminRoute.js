import React from 'react'; // React library.
import { Route, Redirect } from 'react-router-dom';// React Routing Components.
import { isAuth } from './Helpers.jsx';// Helper Componensts.

// Admin User:
// Authenticate user and confirm user role...
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuth() && isAuth().role === 'admin' ? (
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

export default AdminRoute;