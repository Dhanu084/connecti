const Posts = require('../models/posts')
const User = require('../models/users');
// module.exports.home = function(req,res){
//     console.log(req.cookies)
//     //res.cookie('user_id',01);
//     res.render('home',{
//         title : "home",
//     })
// }

module.exports.home = async function(req,res){
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
    try{
        let posts = await Posts.find({}).populate('User')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })

    let users= await User.find({});

    return res.render('home',{
        title:'Connecti|home',
        posts:posts,
        all_users:users,
    })


    }
    catch(err){
        console.log(err);
        return 
    }
    
}

