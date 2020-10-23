const express = require('express');// Require Express library.
const router = express.Router();// Enable Express Routing.

// Import Controllers:
const { requireSignin, adminMiddleware } = require('../controllers/auth.controller');
const { viewBarks, createBark, deleteBark, updateBark } = require('../controllers/bark.controller');

// HTTP Requests:
router.get('/', requireSignin, viewBarks);
router.post('/new', requireSignin, createBark);
router.post('/admin', requireSignin, adminMiddleware);
router.put('/update/:_id', requireSignin, updateBark);
router.delete('/:_id', requireSignin, deleteBark);

module.exports = router;



