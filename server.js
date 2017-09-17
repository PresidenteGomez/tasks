//requires
var express = require('express');
var bodyParser = require('body-parser');
//NEED PG --> DATABASE  w/ database files that needs to be accompanied
//require routes
var indexRouter = require('./routes/index');
var thetaskRouter = require('./routes/thetask');

var app= express();

//middleware
app.use(bodyParser.urlencoded({extended: true}));

//this will serve all client side files: client.js, jquery, css
app.use(express.static('public'));//public folder

//Routes
app.use('/', indexRouter);
app.use('/thetask', thetaskRouter);

//spin the SERVIE
app.listen(3001, function (){
    console.log('listening on 3001');
});
