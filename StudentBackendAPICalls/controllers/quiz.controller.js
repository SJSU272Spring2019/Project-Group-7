
const Quizes = require('../models/quiz.model');
const Courses = require('../models/course.model');

//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the Quiz Test controller!');
};


exports.quizCreate = function (req, res)
{

    let quiz = new Quizes(
            {

                 quiz_id:req.body.quiz_id,
                 quiz_name:req.body.quiz_name,
                 quiz_marks:req.body.quiz_marks,
                 total_marks:req.body.total_marks,
                 course_id:req.body.course_id,
                 student_id:req.body.student_id
            }
        );
        console.log("Inside add course");
       Courses.findOneAndUpdate({student_id:req.body.student_id,course_id:req.body.course_id}, {$push: {quizes: quiz}} , function(err, course) {

            if (err)
            {
               console.log("Unable to get professor to add quiz");
               throw err
            }
               else{
                  console.log("Successfully updated course details with quiz details");

               }

        });

        quiz.save(function (err)
        {
            if (err)
            {
                 console.log("Unable to create quiz to this course");
                throw err;
            }
            res.send('Quiz Created successfully');

        })

};

exports.getQuiz = function (req, res) {

    Quizes.find({student_id:req.body.student_id,course_id:req.body.course_id,quiz_id:req.body.quiz_id},function (err, quiz){
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
