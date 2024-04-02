// import express from express modules 
const express = require('express')

// Define expressRouter
const router = express.Router()

// import necessory controller
const studentController = require('../controllers/student_controller')

// import passport modules to use middleware
const passport = require('passport')

// define routes
router.post('/create-student',passport.checkAuthentication, studentController.createStudent)
router.get('/export_file', passport.checkAuthentication, studentController.exportFile)
router.get('/students_list', studentController.studentsList)
router.post('/add_student/:id', passport.checkAuthentication,studentController.addStudent)
router.get('/delete/:id', passport.checkAuthentication, studentController.deleteStudent)
router.get('/remove/:studentId/:companyId', passport.checkAuthentication,studentController.removeStudent)
router.get('/remove_company/:companyId', passport.checkAuthentication, studentController.removeCompany)

// export router
module.exports = router