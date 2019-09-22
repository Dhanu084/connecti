const User = require('../models/users');

module.exports.profile = function(req,res){
    let user_id = req.cookies.user_id
    if(user_id){
            User.findById(user_id,function(err,user){
        if(err){console.log(err);return}
        if(user){
            res.render('userProfile',{
                name:user.name,
                email:user.email,
                id:user.id
            })
        }
        else{
            res.redirect('back');
        }
    });
    }
    else{
        res.redirect('back');
    }
    
}

module.exports.posts = function(req,res){
    res.end("<h1>See your posts here</h1>")
}

module.exports.signup = function(req,res){
    
    return res.render('userSignUp',{
        title:'Connecti || Signup'
    })
}

module.exports.signin = function(req,res){
    return res.render('userSignin',{
        title:'Connecti || Signin'
    })
}

//get the signup data
module.exports.create = function(req,res){
    console.log(req.body,"hai")
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
    console.log('hi')
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log(err); return }
        
        if(user){
            if (user.password!=req.body.password){
                console.log('Incorrect Password');
                res.redirect('back');
            }
            else{
                res.cookie('user_id',user.id);
                res.redirect('/users/profile')
            }
            
        }
        else{
            res.redirect('back');
        }
    })
}

module.exports.deleteSession=function(req,res){
    
    res.clearCookie('user_id')
    res.redirect('/users/signup')
}