const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/connecti_development');

const db = mongoose.connection;

db.on('error',console.log.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;