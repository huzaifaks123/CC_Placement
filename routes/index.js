const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');


router.get('/', homeController.home)
router.get('/export_file', passport.checkAuthentication,homeController.exportFile)
router.use('/user', require('./userRoute'))
router.use('/student', require('./studentRoute'))
router.use('/interviews', require('./interviewsRoute'))

module.exports = router;