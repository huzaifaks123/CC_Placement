const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind('console','Error connecting db'));

db.once('open', () => {
    console.log('connected to database successfully');
})

module.exports = db;