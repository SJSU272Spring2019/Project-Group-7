/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/12/2019     Rama Tejaswini Thotapalli      Initial development for 
                                                            StudentPerformanceChecker            
*/

const bcrypt = require('bcrypt');
const Professors = require('../models/professor.model');



//Simple version, without validation or sanitation
exports.test = function (req, res) 
{
    res.send('Greetings from the Test controller!');
};



exports.professor_register = function (req, res) 
{
    let professor = new Professors(
        {
            _id: req.body._id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
   email : req.body.email,
   phone: req.body.phone,
   address: req.body.address,
   password:req.body.password,
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
        if(req.body.password == professor.password){
    
            return res.send(true);
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


