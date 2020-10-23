import React, { useState } from 'react';// React Library.
import axios from 'axios';// HTTP Requests.
import { Form, Button } from "react-bootstrap"; // React-bootstrap styling components.
import '../stylesheets/style.css';// Custom Style Sheet.
import Google from './Google.js';
import Facebook from './Facebook.js';

// User Signup Component:
const Signup = () => {
    // Initial State
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })

    // Unpack values:
    const { name, email, password } = values;

    // Signup user:
    const clickSubmit = (e) => {
        e.preventDefault();

        axios.post('/auth/signup', { name, email, password })
            .then(response => {
                alert(response.data.message)
            })
            .catch((error) => alert(error.response.data.error))
    }

    const handleInput = (name) => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const signupForm = () => (
        <Form onSubmit={clickSubmit} className="signSheet">
            <Form.Group>
                <Form.Label>Enter Your Full Name:</Form.Label>
                <Form.Control value={name} placeholder="Insert your full name..." onChange={handleInput('name')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Your Email Address:</Form.Label>
                <Form.Control value={email} placeholder="Insert your email..." onChange={handleInput('email')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter A Password:</Form.Label>
                <Form.Control value={password} type="password" placeholder="Enter your password..." onChange={handleInput('password')} />
            </Form.Group>
            <Button type="button" value="Submit" onClick={clickSubmit} className="submit-button">
                SUBMIT
            </Button>
            <p>After registering your details, please click 'signin' in the top menu to log in.</p>
            {/**Google & Facebook login Components */}
            <Google />
            <Facebook />
        </Form>
    )

    return (
        <div>
            <h1 className="heading">Signup:</h1>
            {signupForm()}
        </div>
    )
}

export default Signup
