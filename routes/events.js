/*
    Event Routes
    /api/events
*/
const { Router } = require("express");
const { check } = require('express-validator');

const { validateFields } = require("../middlewares/validate-field");
const { validateJWT }= require('../middlewares/validate-jwt');
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require("../helpers/isDate");
const router = Router();

//* Every petition need to being validate by JWT
router.use( validateJWT );

//* Get events
router.get( '/', getEvent );

//* Create new event
router.post( '/',
    [
        check('title', 'The title is require').not().isEmpty(),
        check('start', 'Initial date is require').custom( isDate ),
        check('end', 'End date is require').custom( isDate ),
        validateFields
    ]
    ,createEvent );

//* Update event
router.put( '/:id', updateEvent );

//* Update event
router.delete( '/:id', deleteEvent );

module.exports = router;