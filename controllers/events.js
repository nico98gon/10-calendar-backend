const { response } = require("express");
const Event = require('../models/Event');


const getEvent = async( req, res = response ) => {

    const events = await Event.find()
                                .populate('user', 'name');

    return res.json({
        ok: true,
        events
    })
}
const createEvent = async( req, res = response ) => {

    // console.log( req.body );
    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }

}

const updateEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok:false,
                msg: 'Event do not exist'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'User id do not match to this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk to admin'
        });
    }

}

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok:false,
                msg: 'Event do not exist'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'User id do not match to this event'
            });
        }

        await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true,
            msg: 'Event deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk to admin'
        });
    }
}

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}