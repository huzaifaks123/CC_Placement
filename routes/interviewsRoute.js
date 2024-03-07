const express = require('express')
const router = express.Router()
const interviewController = require('../controllers/interview_controller')

router.get('/interview_list', interviewController.interviewList)
router.get('/export_file', interviewController.exportFile)
router.post('/create_interview', interviewController.createInterview)
// router.get('/delete_interview/:id', interviewController.deleteInterview)
router.get('/update/:studentId/:companyId/:status', interviewController.updateStudent)

module.exports = router