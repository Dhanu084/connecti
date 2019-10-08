const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//authentication using password
passport.use(new LocalStrategy({
    usernameField : 'email',
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error finding User->Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            return done(null,user);
        })
    }
));

//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//Deserializing the user to decide which key is to be kept in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error finding User->Passport');
            return done(err);
        }

        return done(null,user);
    })
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in ,the pass on the request to the next function which is the next controller's action
    if (req.isAuthenticated()){
        return next();
    }
    //If the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        //re.user contains the current signed in user and we are just sending it to the locals for the views to use
        res.locals.user = req.user;
    }
    next();
}
module.exports=passport;