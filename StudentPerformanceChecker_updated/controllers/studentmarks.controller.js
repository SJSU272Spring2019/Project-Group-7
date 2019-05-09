/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial development for 
                                                            StudentPerformanceChecker            
*/
const Studentmarks = require('../models/studentmarks.model');

const Quizes = require('../models/quiz.model');
const Exams = require('../models/exam.model');
const Assignments = require('../models/assignment.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) 
{
    res.send('Greetings from the Test controller!');
};

exports.studentmarks_create= function (req, res) 
{
    let studentmarks = new Studentmarks(
        {
            student_id: req.body.student_id,
            course_id: req.body.course_id,
    test_type:req.body.test_type,
     
    test_name: req.body.test_name,
    
    test_marks: req.body.test_marks
        }
    );

    const type = req.body.test_type;

    if(type=="quiz")
    {
        console.log("inside quiz");
       quiz_name = req.body.test_name;
        Quizes.findOneAndUpdate({quiz_name:quiz_name},{$push: {student_marks: studentmarks}} , function(err, quiz) {
        
            if (err)
            {
               console.log("Unable to get quiz name  to add quiz");
               throw err;
            }
               else{
                console.log("updated the quizes table with  student marks");
    
                  
               }         
            
        });
    }
    else if(type == "exam")
    {
        console.log("inside exam");
        exam_name = req.body.test_name;
        Exams.findOneAndUpdate({exam_name:exam_name}, {$push: {studentmarks: studentmarks}} , function(err, exam) {
          
          console.log(exam);
            if (err)
            {
               console.log("Unable to get exam name  to add quiz");
               throw err;
            }
               else{
                console.log("updated the exam table with  student marks");
    
                  
               }         
            
        });
    }
    else
    {
        console.log("inside assignment");
        assignment_name = req.body.test_name;
        Assignments.findOneAndUpdate({assignment_name:assignment_name}, {$push: {studentmarks: studentmarks}} , function(err, assignment) {
        
            if (err)
            {
               console.log("Unable to get assignment name  to add quiz");
               throw err;
            }
               else{
                console.log("updated the assignment table with  student marks");
    
                  
               }         
            
        });
    }

    

    studentmarks.save(function (err) 
    {
        if (err) 
        {
            console.log("Unable to add Professor in the database");
        throw err;
        }

        res.send(' Student marks Created successfully')
    })
};






exports.studentmarks_getquiz = function (req, res) {
    Studentmarks.find({student_id:req.body.student_id, course_id:req.body.course_id, test_type:"quiz"}, function (err, studentmarks) {
        
        if (err) {
            console.log("Unable to get professor details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved professor details from the cluster");
            res.send(studentmarks);
            }
        
    })
};

exports.studentmarks_getexam = function (req, res) {
    Studentmarks.find({student_id:req.body.student_id, course_id:req.body.course_id, test_type:"exam"}, function (err, studentmarks) {
        
        if (err) {
            console.log("Unable to get professor details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved professor details from the cluster");
            res.send(studentmarks);
            }
        
    })
};

exports.studentmarks_getassignment = function (req, res) {
    Studentmarks.find({student_id:req.body.student_id, course_id:req.body.course_id, test_type:"assignment"}, function (err, studentmarks) {
        
        if (err) {
            console.log("Unable to get professor details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved professor details from the cluster");
            res.send(studentmarks);
            }
        
    })
};

exports.studentmarks_details_testname = function (req, res) {
    Studentmarks.find({test_name:req.params.test_name}, function (err, studentmarks) {
        
        if (err) {
            console.log("Unable to get professor details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved professor details from the cluster");
            res.send(studentmarks);
            }
        
    })
};

exports.studentmarks_average = function (req, res) {

    var course_id = parseInt(req.body.course_id);
    var test_type = req.body.test_type;
    console.log(course_id);
  
    Studentmarks.aggregate(
      
        [
        
        {$match: { course_id: course_id, test_type : test_type}},
        {$group: {_id :{
           "test_name": "$test_name",
           
        
        }, 
            average: {$avg: "$test_marks"}}}
    ], function (err, result) {
        
        if (err) {
            console.log("Unable to get studentmarks average details of quiz marks");
            throw err;
        }
        else {
            console.log(result);
           res.json(result);
            
            }
    })
};






exports.studentmarks_update = function (req, res) {
    Studentmarks.findOneAndUpdate({student_id:req.params.student_id}, {$set: req.body}, function (err, studentmarks) {
        if (err) {
            console.log("Unable to update professor details in the database");
            throw err}
            else{
                console.log("Successfully updated professor details in the database");
                res.send('Professor details Successfully udpated.');
            }
        
    });
};

exports.studentmarks_delete = function (req, res) {
    Studentmarks.findOneAndRemove({student_id:req.params.student_id}, function (err) {
        if (err) {
            console.log("Unable to delete professor details in the database");
            throw err}
            else
            {console.log("Successfully deleted professor details from the database");
            res.send('Deleted successfully!');
        }
        
    })
};
