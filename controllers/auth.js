const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = ( req, res = response ) => {

    // console.log(req.body)
    const { name, email, password } = req.body;

    // Own validation
    // if ( name.length < 3 ) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'The name should be greather than 3 letters'
    //     });
    // }

    //* error manage
    const errors = validationResult( req );

    // console.log(errors);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }


    res.status(201).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    })
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }


    res.status(201).json({
        ok: true,
        msg: 'register',
        email,
        password
    })
}

const revalidateUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateUser
}