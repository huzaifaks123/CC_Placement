const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');


router.get('/profile', userController.profile)
router.get('/sign-in', userController.signIn)
router.get('/sign-up', userController.signUp)
router.get('/sign-out', userController.signOut)
router.get('/external_jobs_list', userController.externalJobsList)
router.post('/create-user', userController.createUser)
router.post('/create-sessions',passport.authenticate('local', {failureRedirect : '/user/sign-in'}) ,userController.createSessions)

router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}))
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect : 'user/sign-in'}),userController.createSessions)


module.exports = router;