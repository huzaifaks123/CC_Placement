const express = require('express')
const router = express.Router()
const studentController = require('../controllers/student_controller')
const passport = require('passport')

router.post('/create-student',passport.checkAuthentication, studentController.createStudent)
router.get('/export_file', passport.checkAuthentication, studentController.exportFile)
router.get('/students_list', studentController.studentsList)
router.post('/add_student/:id', passport.checkAuthentication,studentController.addStudent)
router.get('/delete/:id', passport.checkAuthentication, studentController.deleteStudent)
router.get('/remove/:studentId/:companyId', passport.checkAuthentication,studentController.removeStudent)
router.get('/remove_company/:companyId', passport.checkAuthentication, studentController.removeCompany)

module.exports = router