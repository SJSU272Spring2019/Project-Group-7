const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    student_id:Number,
    course_id:Number,
    quiz_id:Number,
    quiz_name:String,
    quiz_marks:Number,
    total_marks:Number
});



// Export the model
module.exports = mongoose.model('quizes', QuizSchema,'quizes');