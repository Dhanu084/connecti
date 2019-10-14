const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }
},
{
    timestamps:true
}
);

const Comment = mongoose.model('Comment',commentsSchema);
module.exports=Comment;