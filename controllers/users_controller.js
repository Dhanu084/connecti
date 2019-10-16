const User = require('../models/users');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('userProfile',{
            profile_user:user
        });
    })
    
}

module.exports.update=function(req,res){
    console.log(req.body)
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.posts = function(req,res){
    res.end("<h1>See your posts here</h1>")
}

module.exports.signup = function(req,res){
    if (req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('userSignUp',{
        title:'Connecti || Signup'
    })
}

module.exports.signin = function(req,res){
    if (req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('userSignin',{
        title:'Connecti || Signin',
        
    })
}

//get the signup data
module.exports.create = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error');
            return
        }
        console.log(user);
        if(!user){
            User.create(req.body,function(err){
                if(err){
                    console.log('error');
                    return
                }
                console.log(user)
                res.redirect('/users/signin')
            });
        }
        else{
            res.redirect('back');
        }
    });
    
};

//signin and create session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');    
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}

