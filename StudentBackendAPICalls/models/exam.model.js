const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    student_id:Number,
    course_id:Number,
    exam_id:Number,
    exam_name:String,
    exam_marks:Number,
    total_marks:Number
});



// Export the model
module.exports = mongoose.model('exams', ExamSchema,'exams');