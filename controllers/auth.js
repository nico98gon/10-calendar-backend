const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async( req, res = response ) => {

    // console.log(req.body)
    const { email, password } = req.body;

    // Own validation
    // if ( name.length < 3 ) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'The name should be greather than 3 letters'
    //     });
    // }

    try{

        let user = await User.findOne({ email });
        // console.log( user );

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already in use'
            });
        }

        user = new User( req.body );
    
        //* crypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
    
        //* Generate JWT
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }
}

const loginUser = async(req, res = response) => {
    
    const { email, password } = req.body;
    
    try {

        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong email'
            });
        }

        //* Confirm password
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong Password'
            });
        }

        //* Generate our JSON Web Token (JWT)
        const token = await generateJWT( user.id, user.name );


        res.json({
            ok: true,
            uid: user.uid,
            name: user.name,
            token
        })

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }
}

const revalidateUser = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateUser
}