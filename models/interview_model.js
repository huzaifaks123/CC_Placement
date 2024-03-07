const mongoose = require('mongoose')

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

const Interview = mongoose.model('Interview', interviewSchema)

module.exports = Interview