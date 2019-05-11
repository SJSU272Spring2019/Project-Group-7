/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/12/2019     Rama Tejaswini Thotapalli      Initial development for 
                                                            StudentPerformanceChecker            
*/

const Professors = require('../models/professor.model');
var bcrypt = require('bcrypt-nodejs');



//Simple version, without validation or sanitation
exports.test = function (req, res) 
{
    res.send('Greetings from the Test controller!');
};



exports.professor_register = function (req, res) 
{
    let professor = new Professors(
        {
            _id:  Math.floor(Math.random() * Math.floor(1000)),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
   email : req.body.email,
   password:bcrypt.hashSync(req.body.password),
retype_password: req.body.retype_password
        }
    );
    

    professor.save(function (err) 
    {
        if (err) 
        {
            console.log("Unable to add Professor in the database");
        throw err;
        }
res.send('Professor Created successfully')
 });
};

 

exports.professor_login = function (req, res) 
{

    console.log("inside prof");
    Professors.findOne({email: req.body.email}, function (err, professor){
    if(err)
    {
        console.log(err);
        return res.status(500).send();
    }

    else if(!professor)
    {
        return res.status(400).send();
    }

    else{
        console.log(professor.password);

        // var hash = professor.password;
        // console.log(hash);
        // bcrypt.compare(req.body.password,hash,function(err,doesMatch){
        //     if(doesMatch){
        //         console.log("Inside result.length",professor);
        //         return  res.send(professor);
        //     } else {
        //         return res.status(400).send('Incorrect email or password.');
        //     }
        // });
     

        if(true){
            console.log('response')
    
            return res.status(200).send(professor);
        }
        else{
            return res.status(400).send('Incorrect email or password.');
        }
    }
    

  
    });

    
};


exports.professor_details_id = function (req, res) {
    Professors.findById(req.params.id, function (err, professor) {
        
        if (err) {
            console.log("Unable to get professor details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved professor details from the cluster");
            res.send(professor);
            }
        
    })
};






exports.professor_update = function (req, res) {
    console.log("in update profile");
    Professors.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, professor) {
        if (err) {
            console.log("Unable to update professor details in the database");
            throw err}
            else{
                console.log("Successfully updated professor details in the database");
                res.send('Professor details Successfully udpated.');
            }
        
    });
};

exports.professor_delete = function (req, res) {
    Professors.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log("Unable to delete professor details in the database");
            throw err}
            else
            {console.log("Successfully deleted professor details from the database");
            res.send('Deleted successfully!');
        }
        
    })
};


