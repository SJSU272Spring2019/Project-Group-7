
const Students = require('../models/student.model');

//const Quiz = require('../models/student.model');


//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the Test controller!');
};

exports.student_register = function (req, res)
{

    const courses=[];
    courses.push({
         course_id:req.body.course_id,
         course_name:req.body.course_name
     });


    let newStudent = new Students(
    {
    student_id: req.body.student_id,
    student_name: req.body.student_name,
    standard: req.body.standard,
    section: req.body.section,
    contact: req.body.contact,
    email_id : req.body.email_id,
    password:req.body.password,
    courses : [courses]
    });

    newStudent.save(function (err)
    {
        if (err)
        {
            console.log("Unable to add Student in the database");
        throw err;
        }

        res.send(' Student Created successfully')
    });
};


exports.student_login = function (req, res)
{
    console.log(req.body);

    Students.findOne({email_id: req.body.email_id , password: req.body.password}, function (err, student){
    if(err)
    {
        console.log(err);
        return res.status(500).send();
    }

    console.log(err);
    console.log(student);

    if(!student)
    {
        return res.status(400).send();
    }

    return res.status(200).send();
    });
};


exports.getCourses = function (req, res) {

    Students.find({student_id:2,'courses.course_id':1},'courses',function (err, students){
        if (err) {
            console.log("Unable to get student details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved student details from the cluster");
            res.send(students);
            console.log(students);
            }

    });
};


