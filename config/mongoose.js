// import mongoose from modules
const mongoose = require('mongoose');

// connect mongoose to the URL
mongoose.connect(process.env.MONGO_URL);

// define db as mongoose connection
const db = mongoose.connection;

// handling db error
db.on('error', console.error.bind('console','Error connecting db'));

// handling db success
db.once('open', () => {
    console.log('connected to database successfully');
})

// export db
module.exports = db;