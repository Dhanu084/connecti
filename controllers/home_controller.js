const Posts = require('../models/posts')
const User = require('../models/users');
// module.exports.home = function(req,res){
//     console.log(req.cookies)
//     //res.cookie('user_id',01);
//     res.render('home',{
//         title : "home",
//     })
// }

module.exports.home = function(req,res){
    // Posts.find({},function(err,posts){
    //     if(err){
    //         console.log('Error in Finding the post');
    //         return;
    //     }
    //     res.render('home',{
    //         'title':'home',
    //         'posts':posts
    //     })
    // })
    //populate the user of each post
    Posts.find({}).populate('User')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,posts){
       User.find({},function(err,users){
           res.render('home',{
               title:'Connecti',
               posts:posts,
               all_users:users
           });
       });
        
    })
}

