const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

var app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/public/js/js/lib')));
app.use('/views', express.static(path.join(__dirname, '/views')));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/course-main.html'));
});

app.get('/overview', function(req, res){
    res.sendFile(path.join(__dirname, 'views/student-overview.html'));
});

app.get('/course-overview', function(req, res){
    res.sendFile(path.join(__dirname, 'views/course-overview.html'));
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});