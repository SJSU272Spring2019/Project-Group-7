const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
    course_name:String,
    keyword:String,
    suggestion:String
});


// Export the model
module.exports = mongoose.model('suggestions', SuggestionSchema,'suggestions');