const Posts = require('../models/posts')

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
    Posts.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,posts){
        res.render('home',{
            'title':'home',
            posts:posts
        })
        
    })
}