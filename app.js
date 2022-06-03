const port = process.env.PORT || 8080;

// base variables
var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var conn = require('./lib/db');

//for CSS to take effect
app.use('/public', express.static('public'));

// ************ ROUTING **********************
var indexRoute = require('./routes/index');
var adminRoute = require('./routes/admin');
var admin_loginRoute = require('./routes/admin_login');
var customer_loginRoute = require('./routes/customer_login');
var carsRoute = require('./routes/cars');

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup bodyParser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

//setup sessions
app.use(cookieParser());
app.use(session({
    secret: 'oppai', //used to generate the token for the session
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 120000}
}));
app.use(flash());  //flash messages stored in message bag

//routing middlewares
app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/admin_login', admin_loginRoute);
app.use('/customer_login', customer_loginRoute);
app.use('/cars', carsRoute);


app.listen(port, () => console.log(`Listening on port ${port}..`));