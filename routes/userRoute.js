// import express from express modules 
const express = require('express');

// Define expressRouter
const router = express.Router();

// import necessory controller
const userController = require('../controllers/user_controller');

// import passport modules to use middleware
const passport = require('passport');

// define routes
router.get('/profile', userController.profile)
router.get('/sign-in', userController.signIn)
router.get('/sign-up', userController.signUp)
router.get('/sign-out', userController.signOut)
router.get('/external_jobs_list', userController.externalJobsList)
router.post('/create-user', userController.createUser)
router.post('/create-sessions',passport.authenticate('local', {failureRedirect : '/user/sign-in'}) ,userController.createSessions)
router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}))
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect : 'user/sign-in'}),userController.createSessions)

// export router
module.exports = router;