const Posts = require('../models/posts')
const Comment = require('../models/comments');

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

module.exports.destroy = function(req,res){
    Posts.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
            return
        }
        if(post.user == req.user.id){
            post.remove();
        
            Comment.deleteMany({post:req.params.id},function(err){
                res.redirect('back');
            });
        }
        else{
            res.redirect('back');
        }
        
    })
}