const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Assignment = new Schema({
    assignment_id:Number,
    assignment_name:String,
    tot_marks:Number,
    assignment_marks:Number
});


const CourseAssignmentSchema = new Schema({
    course_id:Number,
    assignment:[Assignment]
});


const AssignmentSchema = new Schema({
    student_id:Number,
    courses:[CourseAssignmentSchema]
});



// Export the model
module.exports = mongoose.model('assignments', AssignmentSchema,'assignments');