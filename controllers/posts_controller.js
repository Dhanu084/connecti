const Posts = require('../models/posts')
const Comment = require('../models/comments');

module.exports.create = async function(req,res){
    try{
        await Posts.create({
            content:req.body.content,
            user:req.user._id,
        });
        req.flash('success','Post published')
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err)
        console.log(err);
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    try{
        await Posts.findById(req.params.id)
       
        if(post.user == req.user.id){
            post.remove();
        
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','Post deleted')
            return  res.redirect('back');
        
        }
        else{
            req.flash('error','Not authorised to delete post')
            res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err)
        console.log(err);
        return;
    }
   
}