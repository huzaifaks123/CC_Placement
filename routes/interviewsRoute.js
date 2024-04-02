// import express from express modules 
const express = require('express')

// Define expressRouter
const router = express.Router()

// import necessory controller
const interviewController = require('../controllers/interview_controller')

// import passport modules to use middleware
const passport = require('passport')

// define routes
router.get('/interview_list', interviewController.interviewList)
router.get('/export_file',passport.checkAuthentication, interviewController.exportFile)
router.post('/create_interview', passport.checkAuthentication, interviewController.createInterview)
router.get('/update/:studentId/:companyId/:status', passport.checkAuthentication, interviewController.updateStudent)

// export router
module.exports = router