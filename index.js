const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const port = 8000;
const cookierParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); 


app.use(express.urlencoded());
app.use(cookierParser());

app.use(express.static('./assets'));
app.use(expressLayout)
//use express router
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

//mongostore is used to store the seesion cookie in the DB
app.use(session({
    name:'connecti',
    //TODO - change the secret before deployment
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    },
    store:new MongoStore({
            mongooseConnection : db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err|'connect to mongodb');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error ${err}`);
        return
    }
    console.log('Connection established');
})