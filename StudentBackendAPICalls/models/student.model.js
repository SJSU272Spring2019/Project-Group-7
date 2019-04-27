const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CourseSchema = new Schema({
    course_id:Number,
    course_name:String
});


const StudentSchema = new Schema({
    student_id:Number,
    student_name:String,
    standard:String,
    section:String,
    contact:Number,
    email_id:String,
    password:String,
    courses:[CourseSchema]
});


// Export the model
module.exports = mongoose.model('student', StudentSchema,'student');
