const express = require('express');// Require Express library.
const router = express.Router();// Enable Express Routing.

// Import Controllers:
const { loginUser, registerUser, adminMiddleware, facebookAuth , googleAuth } = require('../controllers/auth.controller');

// Local Signin/ Authentication:
router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/admin', adminMiddleware)

// Facebook & Google Auth:
router.post('/facebook-loggin', facebookAuth)
router.post('/google-loggin', googleAuth);

module.exports = router;