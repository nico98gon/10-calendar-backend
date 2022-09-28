
const express = require('express');
require('dotenv').config();

// console.log( process.env );

//* Create server of express
const app = express();

//* public directory
app.use( express.static('public') );

//* Read and parse of the body
app.use( express.json() );

//* Routes
app.use( '/api/auth', require('./routes/auth') );

// TODO: CRUD: Events


//* Listen petitions
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});