

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let StudentSchema = new Schema({
    _id: {type: Number, required: true, max: 100},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    email : {type: String, required: true, type: String, required: true, unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], index: {unique: true, dropDups: true}
    },
    phone: {type: Number, required:true},
    address: {type: String},
    courses: [{course_id:{type: Number},
               course_name:{type: String},
               student_id :{type: Number}}],
    standard: {type: Number},
    password:{type: String},
    createdAt: {type: Date, default :Date.now()}
    });

// Export the model
module.exports = mongoose.model('Student', StudentSchema,'Student');
