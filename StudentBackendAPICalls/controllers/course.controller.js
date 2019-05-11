const Courses = require('../models/course.model');
const Students = require('../models/student.model');


exports.createCourse = function (req, res) {
    let course = new Courses(
        {
            course_id:req.body.course_id,
            course_name:req.body.course_name,
            student_id :req.body.student_id

        }
    );
    console.log("Inside add course");
   Students.findByIdAndUpdate(req.body.student_id, {$push: {courses: course}} , function(err, student) {

        if (err)
        {
           console.log("Unable to get student");
           throw err
        }
           else{
               console.log("Successfully retrieved student details and update course details");

           }

    });

    course.save(function (err)
    {
        if (err)
        {
             console.log("Unable to add  course to student");
            throw err;
        }
        res.send('Course Created successfully');

    })


};

exports.getCourseDetails = function (req, res) {
    Courses.find({student_id:req.body.student_id,course_id:req.body.course_id}, function (err, course) {

        if (err) {
            console.log("Unable to get Quiz details");
            throw err;
        }

        else {
            console.log("Successfully retrieved quiz details");
            res.send(course);
            }

    })
};


exports.updateCourseDetails = function (req, res) {
    Courses.findOneAndUpdate({student_id:req.params.student_id,course_id:req.params.course_id}, {$set: req.body}, function (err, course) {
        if (err) {
            console.log("Unable to update course details in the database");
            throw err}
            else{
                console.log("Successfully updated course details in the database");
                res.send('Student details Successfully updated.');
            }

    });
};

exports.deleteCourseDetails = function (req, res) {
    Courses.findOneAndRemove({student_id:req.params.student_id,course_id:req.params.course_id}, function (err) {
        if (err) {
            console.log("Unable to delete course details in the database");
            throw err}
            else
            {console.log("Successfully deleted course details from the database");
            res.send('Deleted successfully!');
        }

    })
};

exports.getCourseQuiz = function (req, res) {
    Courses.find({student_id:req.body.student_id,course_id:req.body.course_id},'quizes', function (err, course) {

        if (err) {
            console.log("Unable to get Quiz details");
            throw err;
        }

        else {
            console.log("Successfully retrieved quiz details");
            res.send(course);
            }

    })
};



exports.getCourseExam = function (req, res) {
    Courses.find({student_id:req.body.student_id,course_id:req.body.course_id},'exams', function (err, course) {

        if (err) {
            console.log("Unable to get Quiz details");
            throw err;
        }

        else {
            console.log("Successfully retrieved quiz details");
            res.send(course);
            }

    })
};


exports.getCourseAssignment = function (req, res) {
    Courses.find({student_id:req.body.student_id,course_id:req.body.course_id},'assignments', function (err, course) {

        if (err) {
            console.log("Unable to get Quiz details");
            throw err;
        }

        else {
            console.log("Successfully retrieved quiz details");
            res.send(course);
            }

    })
};