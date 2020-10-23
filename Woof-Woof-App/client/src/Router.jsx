import React from 'react';// React library.
import { BrowserRouter as MainRouter, Switch, Route } from 'react-router-dom';// React Routing Components.
import "./stylesheets/App.css"; // Custom Stylesheet.

// Import Components:
import App from './components/App.js';
import Signup from './auth/Signup';
import Signin from './auth/Singin';
import Layout from './core/Layout';
import Admin from "./core/Admin";
import Private from "./core/Private";
import PageNotFound from './core/PageNotFound';
import Barks from './components/Barks';
//import Form from './components/Form';

// Import protected routes:
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';

const Router = () => {
    return (
        <MainRouter>
            <Layout>
                <Switch>
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/" exact component={App} />
                    <AdminRoute path="/admin" exact component={Admin} />
                    <PrivateRoute path="/private" exact component={Private} />
                    <PrivateRoute path="/barks" exact component={Barks} />
                    <Route path="*" exact component={PageNotFound} />
                </Switch>
            </Layout>
        </MainRouter>
    )
}

export default Router;
