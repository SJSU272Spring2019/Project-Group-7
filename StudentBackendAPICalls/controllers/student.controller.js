
const Students = require('../models/student.model');


//Simple version, without validation or sanitation
exports.test = function (req, res)
{
    res.send('Greetings from the Test controller!');
};

exports.student_register = function (req, res)
{
    let newStudent = new Students(
    {
    _id: req.body._id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address:req.body.address,
    standard: req.body.standard,
    password : req.body.password
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


exports.getStudentProfile = function (req, res) {
    console.log(req.params.id);
    Students.findById(req.params.id, function (err, student) {
        if (err) {
            console.log("Unable to get student details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved student details from the cluster");
            console.log(student);
            res.send(student);
            }

    })
};

exports.getStudentCourses = function (req, res) {
    Students.find(req.params.id, 'courses', function (err, student) {

        if (err) {
            console.log("Unable to get student details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved student details from the cluster");
            res.send(student);
            }

    })
};



exports.updateStudentProfile = function (req, res) {
    console.log(req.body);
    Students.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, student) {
        if (err) {
            console.log("Unable to update student details in the database");
            throw err}
            else{
                console.log("Successfully updated student details in the database");
                res.send('Student details Successfully updated.');
            }

    });
};


exports.deleteStudentProfile = function (req, res) {
    Students.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log("Unable to delete professor details in the database");
            throw err}
            else
            {console.log("Successfully deleted professor details from the database");
            res.send('Deleted successfully!');
        }

    })
};