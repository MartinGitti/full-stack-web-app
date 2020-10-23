import React, { Fragment } from 'react';// React Library.
import { withRouter, Link } from 'react-router-dom';// React Routing Components.
import { isAuth, signout } from '../auth/Helpers.jsx';// Helper components.
import '../stylesheets/style.css';// Custom Style Sheet.
import { Nav } from "react-bootstrap"; // React-bootstrap styling components.

// Layout template for Woof Woof App:
const Layout = ({ children, history }) => {
    const isActive = (path) => {
        if (history.location.pathname === path) {
            return { color: '#90adff' };
        } else {
            return { color: '#fff' };
        }
    };

    const nav = () => (
        <div className="container">
            <Nav className="row justify-content-md-center navbar">
                <Nav.Item className="nav nav-tabs bg-dark" style={{ display: 'flex' }}>
                    <Nav className="nav-item" style={isActive('/')}>
                        <Link to="/">
                            Home
                        </Link>
                    </Nav>
                    {!isAuth() && (
                        <React.Fragment>
                            <Nav className="nav-item" style={isActive('/signin')}>
                                <Link to="/signin">
                                    SignIn
                                </Link>
                            </Nav>
                            <Nav className="nav-item signup-page" style={isActive('/signup')}>
                                <Link to="/signup">
                                    Signup
                                </Link>
                            </Nav>
                        </React.Fragment>
                    )}

                    {isAuth() && (
                        <React.Fragment>
                            <li className="nav-item">
                                <span
                                    className="nav-link"
                                    onClick={() => {
                                        signout(() => {
                                            history.push('/');
                                        });
                                    }}
                                    style={{ color: '#fff', cursor: 'pointer' }}
                                >
                                    Signout
						</span>
                            </li>
                            <Nav className="nav-item" style={isActive('/barks')}>
                                <Link to="/barks">
                                    Barks
                                </Link>
                            </Nav>
                        </React.Fragment>
                    )}

                    {isAuth() &&
                        isAuth().role === 'admin' && (
                            <Nav className="nav-item text-right" style={isActive('/admin')}>
                                <Link to="/admin">
                                    {isAuth().name}
                                </Link>
                            </Nav>
                        )}

                    {isAuth() &&
                        isAuth().role === 'subscriber' && (
                            <Nav className="nav-item" style={isActive('/private')}>
                                <Link to="/private">
                                    {isAuth().name}
                                </Link>
                            </Nav>
                        )}
                </Nav.Item>
            </Nav>
        </div >
    );
    return (
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);