const express = require('express')
const router = express.Router();
const posts_controller = require('../controllers/posts_controller');
const passport = require('passport');
router.post('/create',passport.checkAuthentication,posts_controller.create);

module.exports=router;