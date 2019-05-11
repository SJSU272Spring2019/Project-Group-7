/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const Quizes= require('../models/quiz.model');
const Courses = require('../models/course.model');
const Professors = require('../models/professor.model');


//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the Quiz Test controller!');
};


exports.quiz_create = function (req, res) {
    let quiz = new Quizes(
        {
           
            
            quiz_name:req.body.quiz_name,
             
             total_marks:req.body.total_marks,
             course_id:req.body.course_id
             
           
        }
    );
    console.log("Inside add course");
   Courses.findOneAndUpdate({course_id:req.body.course_id}, {$push: {quizes: quiz}} , function(err, course) {
        
        if (err)
        {
           console.log("Unable to get professor to add quiz");
           throw err
        }
           else{
            Professors.findByIdAndUpdate({_id:req.body.professor_id}, {$push: {courses: course}} , function(err, professor) {
        
                if (err)
                {
                   console.log("Unable to get professor");
                   throw err
                }
                   else{
                       console.log("Successfully retrieved professor details and update course details");
                      
                   }         
                
            });
              
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


exports.quiz_details_id = function (req, res) {
    Quizes.findOne({quiz_id:req.params.quiz_id}, function (err, quiz) {
        
        if (err) {
            console.log("Unable to get Quiz details");
            throw err;
        }

        else {
            console.log("Successfully retrieved quiz details");
            res.send(quiz);
            }
        
    })
};

exports.quiz_average = function (req, res) {

    var course_id = parseInt(req.body.course_id);
    
    
  
    Quizes.aggregate(
      
        [
        
        {$match: { course_id: course_id}},
        {$group: {_id :{
           "quiz_name": "$quiz_name",
           
        
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

exports.quiz_average = function (req, res) {
  
    Quizes.aggregate(
       // console.log(req.params.quiz_id)
        [
        //console.log(req.params.quiz_id);
        {$match: {}},
        {$group: {_id :"$quiz_id", 
            average: {$avg: "$quiz_marks"}}}
    ], function (err, result) {
        
        if (err) {
            console.log("Unable to get average details of quiz marks");
            throw err;
        }
        else {
            console.log(result);
           res.json(result);
            
            }
    })
};


exports.quiz_update = function (req, res) {
    Quizes.findOneAndUpdate({quiz_name:req.params.quiz_name}, {$set: req.body}, function (err, quiz) {
        if (err) {
            console.log("Unable to update quiz details in the database");
            throw err}
            else{
                console.log("Successfully updated quiz details in the database");
                res.send('quiz details Successfully udpated.');
            }
        
    });
};

exports.quiz_delete = function (req, res) {
    Quizes.findOneAndRemove({quiz_name:req.params.quiz_name}, function (err) {
        if (err) {
            console.log("Unable to delete quiz details in the database");
            throw err}
            else
            {console.log("Successfully deleted quiz details from the database");
            res.send('Deleted successfully!');
        }
        
    })
};