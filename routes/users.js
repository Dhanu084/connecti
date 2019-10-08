const express = require('express')
const router = express.Router();
const userController = require('../controllers/users_controller.js');
const passport = require('passport');

router.use('/profile',passport.checkAuthentication,userController.profile);
router.use('/posts',userController.posts);
router.use('/signup',userController.signup);
router.use('/signin',userController.signin);

router.post('/create',userController.create)

//using passport as middlewzare to autenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.createSession)

router.get('/signout',userController.destroySession);
module.exports = router;