/*
    User routes / Auth
    host + /api/auth
*/

// const express = require('express');
// const router = express.Router;
const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { createUser, loginUser, revalidateUser } = require('../controllers/auth');

router.post('/new', 
    [ //middlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'Password should be 6 characters minimum').isLength({ min: 6 }),
    ],
    createUser );

router.post('/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'Password should be 6 characters minimum').isLength({ min: 6 }),
    ]
, loginUser );


router.get('/renew', revalidateUser );

module.exports = router;