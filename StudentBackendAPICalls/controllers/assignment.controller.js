const Assignments = require('../models/assignment.model');
const Courses = require('../models/course.model');


//Simple version, without validation or sanitation
exports.assignmentTest = function (req, res)
{
    res.send('Greetings from the Quiz Test controller!');
};


exports.createAssignment = function (req, res) {
    let assignment = new Assignments(
        {

            assignment_id:req.body.assignment_id,
            assignment_name:req.body.assignment_name,
            assignment_marks:req.body.assignment_marks,
            total_marks:req.body.total_marks,
            course_id:req.body.course_id,
            student_id:req.body.student_id

        }
    );
    console.log("Inside add course");
   Courses.findOneAndUpdate({student_id:req.body.student_id,course_id:req.body.course_id}, {$push: {assignments: assignment}} , function(err, course) {

        if (err)
        {
           console.log("Unable to get professor to add assignment");
           throw err
        }
           else{
              console.log("Successfully updated course details with assignment details");

           }

    });

    assignment.save(function (err)
    {
        if (err)
        {
             console.log("Unable to create assignment to this course");
            throw err;
        }
        res.send('assignment Created successfully');

    })


};


exports.getAssignment = function (req, res) {

    Assignments.find({student_id:req.body.student_id,course_id:req.body.course_id,assignment_id:req.body.assignment_id},function (err, assignments){
        if (err) {
            console.log("Unable to get student details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved student details from the cluster");
            res.send(assignments);
            console.log(assignments);
            }

    });
};