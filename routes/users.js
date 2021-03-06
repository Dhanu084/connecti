const express = require('express')
const router = express.Router();
const userController = require('../controllers/users_controller.js');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/signup',userController.signup);
router.get('/signin',userController.signin);

router.post('/create',userController.create)

//using passport as middlewzare to autenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin',
    failureFlash:true},
),userController.createSession)

router.get('/signout',userController.destroySession);
module.exports = router;