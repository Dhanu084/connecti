const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');
const cookierParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookierParser());

app.use(express.static('./assets'));
app.use(expressLayout)
//use express router
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port, function(err){
    if (err){
        console.log(`Error ${err}`);
        return
    }
    console.log('Connection established');
})