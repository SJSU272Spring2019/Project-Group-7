/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_id:{type: Number},
    course_name:{type: String},
    professor_id :{type: Number},
   
    quizes: [
        {
        quiz_name:{type: String},
        total_marks:{type: Number},
        course_id:{type: Number},
    }],
    exams: [
            {
            exam_name:{type: String},
            total_marks:{type: Number},
            course_id:{type: Number}}],
    assignments: [
                {
                assignment_name:{type: String},
                total_marks:{type: Number},
                course_id:{type: Number}}]
 
});

module.exports = mongoose.model('Courses', CourseSchema);