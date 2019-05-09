/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const Courses = require('../models/course.model');
const Professors = require('../models/professor.model');

const Students = require('../models/student.model');


exports.course_create = function (req, res) {
    let course = new Courses(
        {
            course_id:req.body.course_id,
            course_name:req.body.course_name,
            professor_id :req.body.professor_id
           
        }
    );
    console.log("Inside add course");
   Professors.findByIdAndUpdate(req.body.professor_id, {$push: {courses: course}} , function(err, professor) {
        
        if (err)
        {
           console.log("Unable to get professor");
           throw err
        }
           else{
               console.log("Successfully retrieved professor details and update course details");
              
           }         
        
    });

    

    course.save(function (err) 
    {
        if (err) 
        {
             console.log("Unable to add  course to professor");
            throw err; 
        }
        res.send('Course Created successfully');

    })

 
};

exports.course_details_id = function (req, res) {
    Courses.find({course_id:req.params.course_id}, function (err, course) {
        
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

exports.getallcourses = function (req, res) {
    Courses.find({},'course_id course_name professor_id', function (err, course) {
        
        if (err) {
            console.log("Unable to get course details");
            throw err;
        }

        else {
            console.log("Successfully retrieved course details");
            res.send(course);
            }
        
    })
};




exports.course_update = function (req, res) {
    Courses.findOneAndUpdate({course_id:req.params.course_id}, {$set: req.body}, function (err, course) {
        if (err) {
            console.log("Unable to update course details in the database");
            throw err}
            else{
                console.log("Successfully updated course details in the database");
                res.send('Professor details Successfully udpated.');
            }
        
    });
};

exports.course_delete = function (req, res) {
    Courses.findOneAndRemove({course_id:req.params.course_id}, function (err) {
        if (err) {
            console.log("Unable to delete course details in the database");
            throw err}
            else
            {console.log("Successfully deleted course details from the database");
            res.send('Deleted successfully!');
        }
        
    })
};