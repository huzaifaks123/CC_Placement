// import mongoose to create Schema
const mongoose = require('mongoose');

// create Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true,
    },
},{
    timestamps :true
})

// define User model
const User = mongoose.model('User', userSchema)

// export model
module.exports = User;