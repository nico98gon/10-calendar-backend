const mongoose = require('mongoose');

const dbConnection = async() => {
    try{

        mongoose.connect( process.env.DB_CNN, {
            // useNewURLParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });

        console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error at initializate DB');
    }
}

module.exports = {
    dbConnection
}