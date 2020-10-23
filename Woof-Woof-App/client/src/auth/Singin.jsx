import React, { useState } from 'react'; // React library.
import axios from 'axios';// HTTP requests.
import { authenticate } from './Helpers.jsx';// Use authentication for users.
import '../stylesheets/style.css';// Custom Style Sheet.
import { Form, Button } from "react-bootstrap"; // React-bootstrap styling components.
import Google from './Google.js';
import Facebook from './Facebook.js';

// Signin Component:
const Signin = () => {
    // Initial State:
    const [values, setValues] = useState({
        email: "",
        password: ''
    })

    // Unpack values:
    // User Email & password...
    const { email, password } = values;

    // Signup user
    const clickSubmit = (e) => {
        e.preventDefault();

        axios.post('/auth/signin', { email, password })
            .then(response => {
                authenticate(response, () => {
                    console.log(response.data)
                })
            })
            .catch((error) => alert(error.response.data.error));
    }

    const handleInput = (name) => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const informParent = response => {
        authenticate(response, () => {
            alert(`Hey ${response.data.user.name}, welcome back!`)
        })
    }

    const signinForm = () => (
        <Form onSubmit={clickSubmit} className="signSheet">
            <Form.Group>
                <Form.Label>Email Address:</Form.Label>
                <Form.Control value={email} placeholder="Insert your email address..." onChange={handleInput('email')} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" >
                <Form.Label>Password:</Form.Label>
                <Form.Control value={password} type="password" placeholder="Enter your password..." onChange={handleInput('password')} />
            </Form.Group>
            <Button type="button" value="Submit" onClick={clickSubmit} className="submit-button">
                SUBMIT
            </Button>
            <p>After submitting your details above, please click 'signin' option in the menu above to gain access to the barks page... </p>
            {/**Google login Component */}
            <Google informParent={informParent} />
            <Facebook informParent={informParent} />
        </Form>
    )

    return (
        <div>
            <h1 className="heading">Signin:</h1>
            {signinForm()}
        </div>
    )
}

export default Signin;
