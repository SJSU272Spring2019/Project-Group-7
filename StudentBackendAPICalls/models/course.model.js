const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_id:{type: Number},
    course_name:{type: String},
    student_id :{type: Number},
    quizes: [
        {quiz_id:{type: Number},
        quiz_name:{type: String},
        quiz_marks:{type: Number},
        total_marks:{type: Number},
        course_id:{type: Number}}],
    exams: [
            {exam_id:{type: Number},
            exam_name:{type: String},
            exam_marks:{type: Number},
            total_marks:{type: Number},
            course_id:{type: Number}}],
    assignments: [
                {assignment_id:{type: Number},
                assignment_name:{type: String},
                assignment_marks:{type: Number},
                total_marks:{type: Number},
                course_id:{type: Number}}]

});

module.exports = mongoose.model('Courses', CourseSchema);