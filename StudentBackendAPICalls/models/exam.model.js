const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema({
    exam_type:String,
    tot_marks:Number,
    exam_marks:Number
});


const CourseExamSchema = new Schema({
    course_id:Number,
    exam:[Exam]
});


const ExamSchema = new Schema({
    student_id:Number,
    courses:[CourseExamSchema]
});



// Export the model
module.exports = mongoose.model('exams', ExamSchema,'exams');