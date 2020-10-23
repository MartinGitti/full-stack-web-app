const User = require('../models/user.model.js');// Reference to user model.

// JWT (JSON Web Token) to transmitting info securely between parties:
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// OAuth2Client (Google Authentication)
const { OAuth2Client } = require('google-auth-library');

// Import Node-fetch:
const fetch = require('node-fetch');

// Register a new user>
// Capture user information name, email and password...
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                message: 'A user with that email already exists. Please singin'
            })
        }

        // If there is no user, create a new user>
        const newUser = new User({ name, email, password });
        // Save new user
        newUser.save();

        return res.status(200).json({
            message: 'User created succesfully! Please signin...',
            newUser
        })
    })
}

// Login a existing user>
// Capture user information, email & password...
const loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not eixst. Please register in order to signin...'
            })
        }

        // authenitcate (validate password)>
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password does not seem to match.'
            })
        }

        // Generate JWT Token:
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, name, role, barks } = user;

        return res.status(200).json({
            token,
            user: { _id, name, role, email, barks }
        })
    })
}

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

// Admin Middelware:
const adminMiddleware = (req, res, next) => {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'User could not be found!'
            })
        }

        if (user.role !== 'admin') {
            return res.status(400).json({
                message: 'Admin resource. Access denied.'
            })
        }

        req.profile = user;
        next()
    })
}

// Create Google client:
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login:
const googleAuth = (req, res) => {
    const { idToken } = req.body;

    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
        .then(response => {
            const { email_verified, name, email } = response.payload;

            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        // Generate Token
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                        const { _id, name, role, barks } = user;

                        return res.status(200).json({
                            token,
                            user: { _id, name, role, email, barks }
                        })
                    }
                    // Create a new user if the user does not exist in our database:
                    else {
                        let password = email + process.env.JWT_SECRET;

                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: 'User signup failed with Google!'
                                })
                            }

                            // Generate Token:
                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                            const { _id, name, role, barks } = data;

                            return res.status(200).json({
                                token,
                                user: { _id, name, role, email, barks }
                            })
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Please try again...'
                })
            }
        })
}

// 3rd Api Facebook login Athentication:
const facebookAuth = (req, res) => {
    // console.log('FACEBOOK LOGIN REQ BODY', req.body);
    const { userID, accessToken } = req.body;

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    return (
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            // .then(response => // console.log(response))
            .then(response => {
                const { email, name } = response;

                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
                        const { _id, email, name, role, barks } = user;

                        return res.json({
                            token,
                            user: { _id, email, name, role, barks }
                        })
                    }
                })
            })
            .catch(error => {
                res.json({
                    error: 'Facebook login failed. Please try again later...'
                })
            })
    )
}

module.exports = {
    registerUser,
    loginUser,
    requireSignin,
    adminMiddleware,
    googleAuth,
    facebookAuth
};