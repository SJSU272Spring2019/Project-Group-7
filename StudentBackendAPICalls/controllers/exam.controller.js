
const Exams = require('../models/exam.model');
const Courses = require('../models/course.model');

//Simple version, without validation or sanitation
exports.examTest = function (req, res)
{
    res.send('Greetings from the Quiz Test controller!');
};

exports.createExam = function (req, res) {
    let exam = new Exams(
        {

            exam_id:req.body.exam_id,
            exam_name:req.body.exam_name,
            exam_marks:req.body.exam_marks,
            total_marks:req.body.total_marks,
            course_id:req.body.course_id,
            student_id:req.body.student_id

        }
    );
    console.log("Inside add course");
   Courses.findOneAndUpdate({student_id:req.body.student_id,course_id:req.body.course_id}, {$push: {exams: exam}} , function(err, course) {

        if (err)
        {
           console.log("Unable to get professor to add Exam");
           throw err
        }
           else{
              console.log("Successfully updated course details with Exam details");

           }

    });

    exam.save(function (err)
    {
        if (err)
        {
             console.log("Unable to create exam to this course");
            throw err;
        }
        res.send('Exam Created successfully');

    })


};


exports.getExam = function (req, res) {

      Exams.find({student_id:req.body.student_id,course_id:req.body.course_id,exam_id:req.body.exam_id},function (err, exam){
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