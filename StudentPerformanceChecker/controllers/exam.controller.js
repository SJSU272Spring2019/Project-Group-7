/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const Exams= require('../models/exam.model');
const Courses = require('../models/course.model');


//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the Exam Test controller!');
};


exports.exam_create = function (req, res) {
    let exam = new Exams(
        {
           
           
            exam_name:req.body.exam_name,
          total_marks:req.body.total_marks,
             course_id:req.body.course_id
             
           
        }
    );
    console.log("Inside add course");
   Courses.findOneAndUpdate({course_id:req.body.course_id}, {$push: {exams: exam}} , function(err, course) {
        
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


exports.exam_details_id = function (req, res) {
    Exams.findOne({exam_name:req.params.exam_name}, function (err, exam) {
        
        if (err) {
            console.log("Unable to get Exam details");
            throw err;
        }

        else {
            console.log("Successfully retrieved exam details");
            res.send(exam);
            }
        
    })
};

exports.exam_average = function (req, res) {

    var course_id = req.body.course_id;
    
    console.log("inside average");
    console.log(course_id)
    
  
    Exams.aggregate(
      
        [
        
        {$match: { course_id: course_id}},
        {$group: {_id :{
           "exam_name": "$exam_name",
           
        
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




exports.exam_update = function (req, res) {
    Exams.findOneAndUpdate({exam_name:req.params.exam_name}, {$set: req.body}, function (err, exam) {
        if (err) {
            console.log("Unable to update exam details in the database");
            throw err}
            else{
                console.log("Successfully updated exam details in the database");
                res.send('exam details Successfully udpated.');
            }
        
    });
};

exports.exam_delete = function (req, res) {
    Exams.findOneAndRemove({exam_name:req.params.exam_name}, function (err) {
        if (err) {
            console.log("Unable to delete exam details in the database");
            throw err}
            else
            {console.log("Successfully deleted exam details from the database");
            res.send('Deleted successfully!');
        }
        
    })
};