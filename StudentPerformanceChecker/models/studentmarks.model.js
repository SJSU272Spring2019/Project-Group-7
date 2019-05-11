/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentmarksSchema = new Schema({
    student_id: {type: Number, max: 100},
    email : {type : String},
    course_id: Number,
   test_type: String,
    test_name:String,
   test_marks:Number,
    
  
   createdAt: {type: Date, default :Date.now()}


});


// Export the model
module.exports = mongoose.model('Studentmarks', StudentmarksSchema);