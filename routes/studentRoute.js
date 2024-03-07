const express = require('express')
const router = express.Router()
const studentController = require('../controllers/student_controller')
const interviewController = require('../controllers/interview_controller')

router.post('/create-student', studentController.createStudent)
router.get('/export_file', studentController.exportFile)
router.get('/students_list', studentController.studentsList)
router.post('/add_student/:id', studentController.addStudent)
router.get('/delete/:id', studentController.deleteStudent)
router.get('/remove/:studentId/:companyId', studentController.removeStudent)
router.get('/remove_company/:companyId', studentController.removeCompany)
// router.get('/delete_interview/:id', interviewController.removeCompany)

module.exports = router