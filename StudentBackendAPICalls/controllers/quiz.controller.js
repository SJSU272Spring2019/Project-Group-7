
const Quiz = require('../models/quiz.model');


//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the Quiz Test controller!');
};

exports.getQuiz = function (req, res) {

    Quiz.find({student_id:2,'courses.course_id':1},{ 'courses.$': 1 },function (err, quiz){
        if (err) {
            console.log("Unable to get student details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved student details from the cluster");
            res.send(quiz);
            console.log(quiz);
            }

    });
};