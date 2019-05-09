const express = require('express');
const bodyParser = require('body-parser');

var URL = require('url-parse');
//const session = require('express-session');
// initialize our express app

const professor = require('./routes/professor.route'); 
const studentmarks = require('./routes/studentmarks.route'); 
const courses = require('./routes/course.route'); 
const quizes = require('./routes/quiz.route'); 
const exams = require('./routes/exam.route'); 
const assignments = require('./routes/assignment.route'); 
const student= require('./routes/student.route');
const recommendation= require('./routes/recommendation.route');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://student:student@cluster0-k58ps.mongodb.net/StudentDatabase';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/professors', professor);
app.use('/studentmarks', studentmarks);
app.use('/courses', courses);
app.use('/quizes', quizes);
app.use('/exams', exams);
app.use('/assignments', assignments);
app.use('/students', student);
app.use('/recommendation', recommendation);

let port =  4444;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});








