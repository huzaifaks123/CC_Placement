// import mongoose to create Schema
const mongoose = require('mongoose')

// create Schema
const studentSchema = mongoose.Schema({
    student_name: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    college_name: {
        type: String,
        required: true,
    },
    placement_status: {
        type: String,
        required: true,
    },
    dsa_score: {
        type: Number,
        required: true,
    },
    webd_score: {
        type: Number,
        required: true,
    },
    react_score: {
        type: Number,
        required: true,
    },
    company_applied: [{
        company_name: {
            type: String,
        },
        placement_result: {
            type: String,
        },
        interview_date: {
            type: String,
            required: true
        },
        company_id: {
            type: String
        }
    }
    ]
}, {
    timestamps: true,
})

// define Student model
const Student = mongoose.model('Student', studentSchema)

// export model
module.exports = Student