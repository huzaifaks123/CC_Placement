const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')


router.get('/', homeController.home)
router.use('/user', require('./userRoute'))
router.use('/student', require('./studentRoute'))
router.use('/interviews', require('./interviewsRoute'))

module.exports = router;