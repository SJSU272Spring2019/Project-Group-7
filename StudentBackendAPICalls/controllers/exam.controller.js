
const Exam = require('../models/exam.model');


//Simple version, without validation or sanitation
exports.examTest = function (req, res)
{
    res.send('Greetings from the Quiz Test controller!');
};

exports.getExamScore = function (req, res) {

      Exam.find({student_id:2,'courses.course_id':1},{ 'courses.$': 1 },function (err, exam){
          if (err) {
              console.log("Unable to get student details from the cluster");
              throw err;
          }

          else {
              console.log("Successfully retrieved student details from the cluster");
              res.send(exam);
              console.log(exam);
              }

      });
  };