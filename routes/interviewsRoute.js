const express = require('express')
const router = express.Router()
const interviewController = require('../controllers/interview_controller')
const passport = require('passport')

router.get('/interview_list', interviewController.interviewList)
router.get('/export_file',passport.checkAuthentication, interviewController.exportFile)
router.post('/create_interview', passport.checkAuthentication, interviewController.createInterview)
router.get('/update/:studentId/:companyId/:status', passport.checkAuthentication, interviewController.updateStudent)

module.exports = router