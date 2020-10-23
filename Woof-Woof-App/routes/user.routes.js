const express = require('express');// Require Express library.
const router = express.Router();// Enable express Routing.

// Import Controllers:
const { requireSignin, adminMiddleware } = require('../controllers/auth.controller');
const { read, update } = require('../controllers/user.controller');

// Import Validators:
router.get('/user/:id', requireSignin, read);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;