const express = require('express');
const bodyParser = require('body-parser');

// initialize our express app

const student = require('./routes/student.route');
const quiz = require('./routes/quiz.route');
const exam = require('./routes/exam.route');
const courses = require('./routes/course.route');
const assignment = require('./routes/assignment.route');
const suggestion = require('./routes/suggestions.route');

const app = express();

const mongoose = require('mongoose');

let dev_db_url = 'mongodb+srv://student:student@cluster0-k58ps.mongodb.net/StudentDatabase';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{
                           useCreateIndex: true,
                           useNewUrlParser: true
                         });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/students', student);
app.use('/courses', courses);
app.use('/quiz', quiz);
app.use('/exam', exam);
app.use('/assignment', assignment);
app.use('/suggestion', suggestion);

let port =  4447;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});






