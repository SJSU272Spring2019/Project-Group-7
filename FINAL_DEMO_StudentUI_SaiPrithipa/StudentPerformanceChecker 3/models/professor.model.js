/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let ProfessorSchema = new Schema({
    _id: {type: Number, required: true, max: 100},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
   email : {type: String, required: true, type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: {unique: true, dropDups: true}
    },
   phone: {type: Number, required:true},
  
   address: {type: String},
  
   

  courses: [{course_id:{type: Number},
    course_name:{type: String},
    professor_id :{type: Number},
    

     

}],

password:{type: String},
retype_password:{type: String},
   createdAt: {type: Date, default :Date.now()}


});


// Export the model

module.exports = mongoose.model('Professor', ProfessorSchema);