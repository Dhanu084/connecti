const Posts = require('../models/posts')
module.exports.create = function(req,res){
    Posts.create({
        content:req.body.content,
        user:req.user._id,
    },function(err,post){
        if(err){
            console.log('Error in creating post');
            return;
        }
        console.log(post)
        return res.redirect('back');
    })
}

