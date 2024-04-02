// import mongoose to create Schema
const mongoose = require('mongoose')

// create Schema
const interviewSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    interview_date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// define interview model
const Interview = mongoose.model('Interview', interviewSchema)

// export model
module.exports = Interview