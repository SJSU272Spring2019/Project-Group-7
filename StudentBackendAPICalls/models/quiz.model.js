const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quiz = new Schema({
    quiz_id:Number,
    quiz_name:String,
    quiz_marks:Number,
    tot_marks:Number
});


const CourseQuizSchema = new Schema({
    course_id:Number,
    quiz:[Quiz]
});


const QuizSchema = new Schema({
    student_id:Number,
    courses:[CourseQuizSchema]
});



// Export the model
module.exports = mongoose.model('quizes', QuizSchema,'quizes');