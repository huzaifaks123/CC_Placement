// import express from express modules 
const express = require('express');

// Define expressRouter
const router = express.Router();

// import necessory controller
const homeController = require('../controllers/home_controller');
const externalJobContainer = require('../controllers/external_job_controller')

// import passport modules to use middleware
const passport = require('passport');

// define routes
router.get('/', homeController.home)
router.get('/export_file', passport.checkAuthentication,homeController.exportFile)
router.use('/user', require('./userRoute'))
router.use('/student', require('./studentRoute'))
router.use('/interviews', require('./interviewsRoute'))
router.get('/externalJobs', externalJobContainer.getJobLists)

// export router
module.exports = router;