const mongoose = require('mongoose')

const postShema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Posts = mongoose.model('Posts',postShema);
module.exports = Posts;