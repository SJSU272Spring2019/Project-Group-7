const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    student_id:Number,
    course_id:Number,
    assignment_id:Number,
    assignment_name:String,
    assignment_marks:Number,
    total_marks:Number
});


// Export the model
module.exports = mongoose.model('assignments', AssignmentSchema,'assignments');