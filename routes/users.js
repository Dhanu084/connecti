const express = require('express')
const router = express.Router();

const userController = require('../controllers/users_controller.js');

router.use('/profile',userController.profile);
router.use('/posts',userController.posts);
router.use('/signup',userController.signup);
router.use('/signin',userController.signin);

router.post('/create',userController.create);
router.post('/create-session',userController.createSession);
router.get('/deleteSession',userController.deleteSession);
module.exports = router;