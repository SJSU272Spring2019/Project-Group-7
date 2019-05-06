/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    course_id:Number,
    
    quiz_name:{type:String,unique:true},
   
    total_marks:Number,
    student_marks: [{ student_id: Number,
       
  
     test_marks:Number
    
   


    }]
});




// Export the model
module.exports = mongoose.model('quizes', QuizSchema);