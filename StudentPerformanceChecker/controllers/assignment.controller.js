/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const Assignments= require('../models/assignment.model');
const Courses = require('../models/course.model');


//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the assignment Test controller!');
};


exports.assignment_create = function (req, res) {
    let assignment = new Assignments(
        {
           assignment_name:req.body.assignment_name,
           total_marks:req.body.total_marks,
            course_id:req.body.course_id
           
           
        }
    );
    
   Courses.findOneAndUpdate({course_id:req.body.course_id}, {$push: {assignments: assignment}} , function(err, course) {
        
        if (err)
        {
           console.log("Unable to get professor to add assignment");
           throw err
        }
           else{
              console.log("Successfully updated course details with assignmentdetails");
              
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


exports.assignment_details_name = function (req, res) {
    Assignments.findOne({assignment_name:req.params.assignment_name}, function (err, assignment) {
        
        if (err) {
            console.log("Unable to get assignment details");
            throw err;
        }

        else {
            console.log("Successfully retrieved assignment details");
            res.send(assignment);
            }
        
    })
};




exports.assignment_update = function (req, res) {
    Assignments.findOneAndUpdate({assignment_name:req.params.assignment_name}, {$set: req.body}, function (err, assignment) {
        if (err) {
            console.log("Unable to update assignment details in the database");
            throw err}
            else{
                console.log("Successfully updated assignment details in the database");
                res.send('assignment details Successfully udpated.');
            }
        
    });
};

exports.assignment_delete = function (req, res) {
    Assignments.findOneAndRemove({assignment_name:req.params.assignment_name}, function (err) {
        if (err) {
            console.log("Unable to delete assignmentdetails in the database");
            throw err}
            else
            {console.log("Successfully deleted assignment details from the database");
            res.send('Deleted successfully!');
        }
        
    })
};