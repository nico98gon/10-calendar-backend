const { response } = require('express');
const User = require('../models/User')

const createUser = async( req, res = response ) => {

    // console.log(req.body)
    // const { name, email, password } = req.body;

    // Own validation
    // if ( name.length < 3 ) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'The name should be greather than 3 letters'
    //     });
    // }

    try{
        const user = new User( req.body );
    
        await user.save();
    
        res.status(201).json({
            ok: true,
            msg: 'register'
        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
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